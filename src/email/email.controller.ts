// src/email/email.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ProcessEmailDto } from './dto/process-email.dto';
import { ProcessResultDto } from './dto/process-result.dto';
import { EmailService } from './email.service';

@ApiTags('email')
@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('process')
  @ApiOperation({ summary: 'Process incoming email with PDF' })
  async processEmail(@Body() emailData: ProcessEmailDto): Promise<ProcessResultDto> {
    return this.emailService.processEmail(emailData);
  }
}