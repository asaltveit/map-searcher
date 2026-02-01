import { Controller, Post, Body, BadRequestException } from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { WorkflowService } from "./workflow.service";
import { UpdateBlockDto } from "./dto/update-block.dto";

@ApiTags("Workflow")
@Controller("api/workflow")
export class WorkflowController {
  constructor(private readonly workflowService: WorkflowService) {}

  @Post("update-block")
  @ApiOperation({ summary: "Update a shared block with research" })
  async updateBlock(@Body() dto: UpdateBlockDto) {
    // Validate blockId format
    if (!this.isValidId(dto.blockId)) {
      throw new BadRequestException("Invalid block ID");
    }

    await this.workflowService.updateBlock(dto.blockId, dto.value);
    return { success: true };
  }

  private isValidId(id: string): boolean {
    return typeof id === "string" && /^[a-zA-Z0-9_-]{1,128}$/.test(id);
  }
}
