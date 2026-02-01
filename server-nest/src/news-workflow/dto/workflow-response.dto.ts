import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class WorkflowStatusDto {
  @ApiProperty({ description: "Workflow ID" })
  id: string;

  @ApiProperty({ description: "Search query" })
  query: string;

  @ApiProperty({ description: "Region for geocoding context" })
  region: string;

  @ApiProperty({ description: "Start date for search" })
  fromDate: Date;

  @ApiProperty({ description: "End date for search" })
  toDate: Date;

  @ApiProperty({
    description: "Current workflow status",
    enum: ["PENDING", "SEARCHING", "PROCESSING", "COMPLETED", "FAILED"],
  })
  status: string;

  @ApiProperty({ description: "Number of articles found" })
  articlesFound: number;

  @ApiProperty({ description: "Number of articles processed" })
  articlesProcessed: number;

  @ApiProperty({ description: "Number of errors encountered" })
  errorCount: number;

  @ApiPropertyOptional({ description: "Error message if failed" })
  errorMessage?: string;

  @ApiPropertyOptional({ description: "Weave trace ID for observability" })
  traceId?: string;

  @ApiPropertyOptional({ description: "When processing started" })
  startedAt?: Date;

  @ApiPropertyOptional({ description: "When processing completed" })
  completedAt?: Date;

  @ApiProperty({ description: "When workflow was created" })
  createdAt: Date;
}

export class StartWorkflowResponseDto {
  @ApiProperty({ description: "Workflow ID" })
  workflowId: string;

  @ApiProperty({ description: "BullMQ job ID" })
  jobId: string;

  @ApiProperty({ description: "Current status" })
  status: string;

  @ApiProperty({ description: "Status check endpoint" })
  statusUrl: string;
}

export class WorkflowListItemDto {
  @ApiProperty({ description: "Workflow ID" })
  id: string;

  @ApiProperty({ description: "Search query" })
  query: string;

  @ApiProperty({ description: "Region" })
  region: string;

  @ApiProperty({ description: "Current status" })
  status: string;

  @ApiProperty({ description: "Number of articles found" })
  articlesFound: number;

  @ApiProperty({ description: "Number of articles processed" })
  articlesProcessed: number;

  @ApiProperty({ description: "When created" })
  createdAt: Date;

  @ApiPropertyOptional({ description: "When completed" })
  completedAt?: Date;
}
