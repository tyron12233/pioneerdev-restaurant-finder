# Pioneer Dev Restaurant Finder

A Restaurant Finder API powered by Google Gemini AI and Foursquare data integration. This application parses human readable text into a JSON Format and then uses that JSON to query the restaurant informations

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Setup](#environment-setup)
- [Building](#building)
- [Running](#running)
- [API Usage](#api-usage)

## Prerequisites

This project uses Bun.
Before you begin, ensure you have the following installed:

- **Bun** (v1.0.0 or later) - [Install Bun](https://bun.sh/docs/installation)

### API Keys Required

You'll need to obtain the following API keys:

1. **Google Gemini API Key** - Get it from [Google AI Studio](https://aistudio.google.com/apikey)
2. **Foursquare API Key** - Get it from [Foursquare Developer Console](https://foursquare.com/developers/home)
3. **CODE_SECRET** - Create a secure secret for API authentication

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/tyron12233/pioneerdev-restaurant-finder &&
cd pioneerdev-restaurant-finder
```

### 2. Install Dependencies with Bun

```bash
bun install
```

This will install all dependencies listed in `package.json` using Bun's fast package manager.

## Environment Setup

### 1. Create Environment File

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Or create it manually:

```bash
touch .env
```

### 2. Configure Environment Variables

Add the following variables to your `.env` file:

```env
# Server Configuration
PORT=3000

# Authentication
CODE_SECRET=your-secure-secret-key-here

# API Keys
GEMINI_API_KEY=your-google-gemini-api-key-here
FOURSQUARE_API_KEY=your-foursquare-api-key-here
```

### 3. Verify Environment Configuration

The application uses Zod for environment validation. If any required variables are missing, the server will fail to start with a clear error message indicating which variables need to be configured.

## Running

Bun natively supports TypeScript, so no build step is necessary. You can run the application directly without compiling.

But you can still build to JavaScript using
```bash
bun build
```

### Development Mode

Start the development server with Bun:

```bash
bun run start
```

Or directly run the server file:

```bash
bun src/server.ts
```

The server will start on the configured `PORT` (default: 3000) and display:

```
Server is running on port 3000
```

### Available Scripts

| Script | Command | Description |
|--------|---------|-------------|
| `start` | `bun src/server.ts` | Start the development server |
| `test` | `bun test` | Run tests |

## API Usage

### Base URL

```
http://localhost:3000
```

### Health Check

```bash
curl http://localhost:3000
```

**Response:**
```json
{
  "message": "Restaurant LLM API is running!"
}
```

### Execute Restaurant Finder

```bash
curl "http://localhost:3000/api/execute?code=YOUR_CODE_SECRET&query=italian+restaurants+in+downtown"
```

#### Query Parameters

| Parameter | Required | Description |
|-----------|----------|-------------|
| `code` | Yes | Authentication code (must match `CODE_SECRET`) |
| `query` | Yes | Restaurant search query (e.g., "italian restaurants near downtown") |

#### Response Example

```json
{
  "success": true,
  data: [
    ...
  ]
}
```

#### Error Responses

- **401 Unauthorized** - Invalid or missing authentication code
- **400 Bad Request** - Invalid or missing query parameter
- **500 Internal Server Error** - Server-side error
