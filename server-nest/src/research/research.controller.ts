import { Controller, Get, Post, Body, Query, Req } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiQuery } from "@nestjs/swagger";
import { ResearchService } from "./research.service";
import { SaveResearchDto } from "./dto/save-research.dto";
import { Request } from "express";

interface RequestWithUser extends Request {
  userId: string;
}

@ApiTags("Research")
@Controller("api/research")
export class ResearchController {
  constructor(private readonly researchService: ResearchService) {}

  @Get()
  @ApiOperation({ summary: "Search research" })
  @ApiQuery({ name: "q", required: false, description: "Search query" })
  async searchResearch(
    @Query("q") query: string = "",
    @Req() req: RequestWithUser,
  ) {
    const userId = req.userId || "default";
    return this.researchService.searchResearch(query, userId);
  }

  @Post()
  @ApiOperation({ summary: "Save research" })
  async saveResearch(
    @Body() dto: SaveResearchDto,
    @Req() req: RequestWithUser,
  ) {
    const userId = req.userId || "default";
    return this.researchService.saveResearch(dto, userId);
  }
}
