// src/email/email.service.ts
import { Injectable } from '@nestjs/common';
import { ProcessEmailDto } from './dto/process-email.dto';
import { ProcessResultDto } from './dto/process-result.dto';
import * as pdf from 'pdf-parse';

@Injectable()
export class EmailService {
  private readonly forbiddenFields = ['Reffer', 'Flat', 'LCL', 'AIR'];
  private readonly mandatoryFields = ['Delivery Date', 'Recipient Address'];

  async processEmail(emailData: ProcessEmailDto): Promise<ProcessResultDto> {
    try {
      // Parse PDF
      const pdfData = await pdf(emailData.pdfContent);

      // Check forbidden fields
      const foundForbidden = this.checkForbiddenFields(pdfData.text);
      if (foundForbidden.length) {
        return {
          status: 'ValidationFailed',
          details: emailData,
          issues: [`Found forbidden fields: ${foundForbidden.join(', ')}`]
        };
      }

      // Check mandatory fields
      const missingFields = this.checkMandatoryFields(pdfData.text);
      if (missingFields.length) {
        return {
          status: 'Failed',
          details: emailData,
          issues: [`Missing mandatory fields: ${missingFields.join(', ')}`]
        };
      }

      return {
        status: 'Success',
        details: emailData
      };
    } catch (error) {
      return {
        status: 'Failed',
        details: emailData,
        issues: [`Processing error: ${error.message}`]
      };
    }
  }

  private checkForbiddenFields(text: string): string[] {
    return this.forbiddenFields.filter(field =>
      text.toLowerCase().includes(field.toLowerCase())
    );
  }

  private checkMandatoryFields(text: string): string[] {
    return this.mandatoryFields.filter(field =>
      !text.toLowerCase().includes(field.toLowerCase())
    );
  }
}