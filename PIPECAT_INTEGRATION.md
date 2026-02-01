# Pipecat React SDK Integration

This document describes the voice chat integration using the Pipecat React SDK in the map-searcher application.

## Overview

The Pipecat integration adds real-time voice chat capabilities to the ArticlePanel component, allowing users to have conversations with an AI assistant about news articles from their alerts using both text and voice.

## Architecture

### Frontend Components

#### PipecatChat Component (`client/src/components/alerts/PipecatChat.tsx`)

A new React component that manages the Pipecat client and voice chat UI.

**Features:**
- Connection management (Connect/Disconnect buttons)
- Microphone control toggle
- Real-time message display with timestamps
- Auto-scroll to latest messages
- Text input for typing messages
- Visual feedback for connection status
- Loading states during message processing

**Key Props:**
- `alertId`: The ID of the alert to get article context
- `onClose`: Optional callback when closing the chat

**State Management:**
- `messages`: Array of chat messages with role and timestamp
- `isConnected`: Connection status to Pipecat bot
- `isLoading`: Message processing state
- `isMicEnabled`: Microphone state
- `isConnecting`: Connection in progress state

#### ArticlePanel Updates

The ArticlePanel component has been updated to:
- Import and use the PipecatChat component
- Add a message circle button in the header to toggle voice chat view
- Switch between article/text chat view and voice chat view
- Pass the alert ID to the Pipecat component

### Backend Integration

#### Alerts Controller Updates (`server-nest/src/alerts/alerts.controller.ts`)

New endpoint added:
```
POST /api/alerts/pipecat/connect
```

**Request Body:**
```json
{
  "alertId": "uuid"
}
```

**Response:**
```json
{
  "token": "base64-encoded-token",
  "sessionId": "session-identifier",
  "roomUrl": "https://pipecat.daily.co/room-name"
}
```

**Features:**
- JWT authentication required
- Validates alert ownership
- Provides session details for Pipecat client

#### Alerts Service Updates (`server-nest/src/alerts/alerts.service.ts`)

New service method:
```typescript
async pipecatConnect(userId: string, alertId: string)
```

**Responsibilities:**
- Verify alert exists and belongs to user
- Generate session tokens
- Create room details
- Return connection information to client

## Installation

The following packages have been added to `client/package.json`:

```json
{
  "@pipecat-ai/client-js": "^latest",
  "@pipecat-ai/client-react": "^latest",
  "@pipecat-ai/daily-transport": "^latest"
}
```

Install dependencies:
```bash
cd client
npm install
```

## Usage

### Starting a Voice Chat

1. Open an alert to view its articles
2. Click the message circle button in the header to toggle to voice chat
3. Click "Start Call" to initiate a connection to the Pipecat bot
4. Enable the microphone when ready to speak
5. Use either text input or voice to communicate with the assistant

### Implementation Details

#### Connection Flow

1. User clicks "Start Call" button
2. Frontend calls `/api/alerts/pipecat/connect` endpoint
3. Backend validates alert and generates session tokens
4. Client receives connection details (token, roomUrl, sessionId)
5. PipecatClient initializes connection using Daily transport
6. Client connects to the Pipecat bot with article context

#### Message Handling

- User messages are sent via `client.sendMessage(message)`
- Bot responses arrive via the 'message' event listener
- Messages are displayed in real-time with timestamps
- UI provides visual feedback during processing

#### Audio Handling

- Microphone can be toggled via button
- The client handles audio capture and transmission
- Daily transport provides the WebRTC infrastructure
- Bot responses include audio synthesis via Pipecat

## Configuration

### Environment Variables

The following environment variable should be set:

```bash
NEXT_PUBLIC_API_URL=http://localhost:3001  # or production API URL
```

### Daily.co Setup (Future Implementation)

For production, you'll need to:

1. Create a Daily.co account and get API credentials
2. Implement room creation and token generation
3. Store room credentials securely
4. Configure Pipecat agent with your LLM provider (OpenAI, Anthropic, etc.)

## File Changes Summary

### Modified Files
- `client/src/components/alerts/ArticlePanel.tsx` - Added PipecatChat integration and toggle button
- `server-nest/src/alerts/alerts.controller.ts` - Added POST /pipecat/connect endpoint
- `server-nest/src/alerts/alerts.service.ts` - Added pipecatConnect service method
- `client/package.json` - Added Pipecat dependencies

### New Files
- `client/src/components/alerts/PipecatChat.tsx` - New voice chat component

## Current Limitations

The current implementation uses mock connection details. For production use:

1. **Daily.co Integration**: Implement real room creation and token generation
2. **Pipecat Agent Setup**: Configure the backend Pipecat agent with:
   - LLM provider credentials
   - System prompt for article context
   - Function calling for article information retrieval
3. **Authentication**: Ensure secure token generation and validation
4. **Error Handling**: Add comprehensive error handling and recovery
5. **Rate Limiting**: Implement rate limiting for voice sessions

## API Documentation

### Connect to Pipecat Bot

```
POST /api/alerts/pipecat/connect

Authorization: Bearer <jwt-token>

Request Body:
{
  "alertId": "550e8400-e29b-41d4-a716-446655440000"
}

Response:
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "sessionId": "session_1704067200000",
  "roomUrl": "https://pipecat.daily.co/alert_550e8400-e29b-41d4-a716-446655440000"
}
```

## References

- [Pipecat Documentation](https://docs.pipecat.ai/)
- [Pipecat React SDK](https://docs.pipecat.ai/client/react/introduction)
- [Daily.co Documentation](https://docs.daily.co/)
- [WebRTC Basics](https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API)

## Testing

To test the Pipecat integration:

1. Start the development server:
   ```bash
   cd client
   npm run dev:local
   ```

2. Navigate to an alert and open the article panel

3. Click the message button to switch to voice chat view

4. Click "Start Call" to initiate a connection (will show mock connection in development)

5. Test message sending and reception

## Next Steps

1. Set up Daily.co account and rooms
2. Configure Pipecat agent backend service
3. Implement proper authentication and session management
4. Add audio quality settings and network diagnostics
5. Implement chat history persistence
6. Add support for multiple concurrent sessions
