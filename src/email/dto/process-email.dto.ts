import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDate, IsNotEmpty } from 'class-validator';

export class ProcessEmailDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  from: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  to: string;

  @ApiProperty()
  @IsDate()
  date: Date;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  subject: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  messageId: string;

  @ApiProperty({ type: 'string', format: 'binary' })
  @IsNotEmpty()
  pdfContent: Buffer;
}