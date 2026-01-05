# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Install dependencies
npm i

# Run development server (with auto-reload)
npm run dev

# Run tests
npm run test
```

## Architecture

This is a Text Q&A API using a **4-layer architecture**:

```
Routes → Controllers → Services → In-Memory Store + OpenAI API
```

- **Routes** (`src/routers/`): Define endpoints, apply validation middleware, delegate to controllers
- **Controllers** (`src/controllers/`): Handle HTTP request/response, extract data, call services
- **Services** (`src/services/`): Business logic, AI integration, throw custom errors
- **Store** (`src/store/`): In-memory storage for the uploaded text

## Key Patterns

- **Error Handling**: Custom `AppError` types in `src/utils/errors.ts` map to HTTP status codes. Global error handler middleware catches all errors.
- **Validation**: Joi schemas in `src/schemas/` with `validateSchemaMiddleware` for request validation
- **Async Errors**: Uses `express-async-errors` - no try/catch needed in route handlers

## API Endpoints

| Method | Endpoint | Request Body | Response | Errors |
|--------|----------|--------------|----------|--------|
| POST | /upload-text | `{ "text": "..." }` | 201 | 422 (invalid) |
| POST | /ask | `{ "question": "..." }` | `{ "answer": "..." }` | 400 (no text), 422 (invalid), 503 (AI error) |

## Environment Variables

```
PORT=4001
OPENAI_API_KEY=your-api-key-here
```

## Testing

- **Framework**: Jest + Supertest for integration tests
- **Location**: `tests/` directory
- **Run tests**: `npm test`
