import { ApiProperty } from '@nestjs/swagger';

export class EmailDetailsDto {
  @ApiProperty()
  from: string;

  @ApiProperty()
  to: string;

  @ApiProperty()
  date: Date;

  @ApiProperty()
  subject: string;

  @ApiProperty()
  messageId: string;
}

export class ProcessResultDto {
  @ApiProperty({ enum: ['Failed', 'Success', 'ValidationFailed'] })
  status: 'Failed' | 'Success' | 'ValidationFailed';

  @ApiProperty({ type: EmailDetailsDto })
  details: EmailDetailsDto;

  @ApiProperty({ type: [String], required: false })
  issues?: string[];
}