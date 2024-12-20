
```
# Email PDF Processor

NestJS service for processing emails with PDF attachments, validating content and generating structured responses.

## Project Structure

email-processor-ruth-cargo/
├── src/
│   ├── email/
│   │   ├── dto/
│   │   │   ├── index.ts              # DTO exports
│   │   │   ├── process-email.dto.ts  # Input DTO
│   │   │   └── process-result.dto.ts # Output DTO
│   │   ├── email.controller.ts       # API endpoints
│   │   ├── email.service.ts          # Business logic
│   │   └── email.module.ts           # Module definition
│   ├── app.module.ts                 # Root module
│   └── main.ts                       # Application entry
├── test/
│   ├── jest-e2e.json                 # E2E test config
│   └── app.e2e-spec.ts               # E2E tests
├── jest.config.js                    # Jest config
├── package.json                      # Dependencies
├── tsconfig.json                     # TypeScript config
└── nest-cli.json                     # NestJS config
```

# Install dependencies
npm install

# Development
npm run start:dev

# Production mode
npm run start:prod

Access Swagger UI: http://localhost:3000/api
API Usage
Process Email Endpoint
POST /email/process
Request Body Example:
```
{
"from": "sender@example.com",
"to": "recipient@example.com",
"date": "2024-01-15T10:00:00Z",
"subject": "Shipment Details",
"messageId": "<unique-id@mail.com>",
"pdfContent": "<base64-encoded-pdf>"
}
```

Response Examples:
Success Case:
```
{
"status": "Success",
"details": {
"from": "sender@example.com",
"to": "recipient@example.com",
"date": "2024-01-15T10:00:00Z",
"subject": "Shipment Details",
"messageId": "<unique-id@mail.com>"
    }
}
```
Validation Failed Case:
```
{
"status": "ValidationFailed",
"details": {
"from": "sender@example.com",
"to": "recipient@example.com",
"date": "2024-01-15T10:00:00Z",
"subject": "Shipment Details",
"messageId": "<unique-id@mail.com>"
    },
"issues": [
"Forbidden field detected: \"LCL\""
    ]
}
```

Processing Failed Case:
```
{
"status": "Failed",
"details": {
"from": "sender@example.com",
"to": "recipient@example.com",
"date": "2024-01-15T10:00:00Z",
"subject": "Shipment Details",
"messageId": "<unique-id@mail.com>"
    },
"issues": [
"Missing mandatory fields: \"Delivery Date\", \"Recipient Address\""
    ]
  }
```

Validation Rules
Forbidden Fields
The following fields will trigger validation failure if found in PDF:

Reffer
Flat
LCL
AIR

Mandatory Fields
The following fields must be present in PDF:

Delivery Date
Recipient Address

Testing

# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
