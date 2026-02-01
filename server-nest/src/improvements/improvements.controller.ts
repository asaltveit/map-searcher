import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Req,
  Headers,
  UnauthorizedException,
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiQuery, ApiHeader } from "@nestjs/swagger";
import { ImprovementsService } from "./improvements.service";
import { ImprovementsCronService } from "./improvements-cron.service";
import { SubmitImprovementDto } from "./dto/submit-improvement.dto";
import { Request } from "express";

interface RequestWithUser extends Request {
  userId: string;
}

@ApiTags("Improvements")
@Controller("api/improvements")
export class ImprovementsController {
  constructor(
    private readonly improvementsService: ImprovementsService,
    private readonly improvementsCronService: ImprovementsCronService,
  ) {}

  @Post()
  @ApiOperation({
    summary: "Submit an improvement request",
    description:
      "Stores a user-submitted improvement (e.g. unmet feature request). User id comes from X-User-Id header or cookie.",
  })
  async submit(
    @Body() dto: SubmitImprovementDto,
    @Req() req: RequestWithUser,
  ): Promise<{ id: string }> {
    const userId = req.userId ?? "default";
    return this.improvementsService.submit(dto.improvement, userId);
  }

  @Get("search")
  @ApiOperation({
    summary: "Search similar improvements",
    description:
      "Used by improvement PR agent for 'users affected'. Returns count and list of requester ids.",
  })
  @ApiQuery({
    name: "q",
    required: false,
    description: "Search query (text match); omit for all.",
  })
  async search(
    @Query("q") q: string = "",
  ): Promise<{ count: number; requesters: string[] }> {
    return this.improvementsService.search(q);
  }

  @Post("run-cycle")
  @ApiOperation({
    summary: "Trigger improvement PR agent run (cron trigger)",
    description:
      "Runs the improvement agent (Python script). Requires X-Cron-Secret header matching IMPROVEMENT_CRON_SECRET. Use from external cron (e.g. GitHub Actions) when the server cannot run Python.",
  })
  @ApiHeader({
    name: "X-Cron-Secret",
    description: "Must match IMPROVEMENT_CRON_SECRET",
    required: true,
  })
  async runCycle(
    @Headers("x-cron-secret") secret: string,
  ): Promise<{ ok: boolean; message: string }> {
    const expected = process.env.IMPROVEMENT_CRON_SECRET;
    if (!expected || secret !== expected) {
      throw new UnauthorizedException("Invalid or missing X-Cron-Secret");
    }
    return this.improvementsCronService.runImprovementAgent();
  }
}
