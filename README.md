# QuickChat 💬

QuickChat is a modern, serverless, real-time messaging application built on AWS and lightweight native browser technologies. It features instant message synchronization, voice messaging, secure user authentication, and a responsive glassmorphic frontend UI.

 Application Link:-https://staging.d3d0secabw2iz2.amplifyapp.com/
## ✨ Features

- 🔐 **Authentication** — Sign up and login with AWS Cognito via SMS verification.
- 💬 **Real-Time Messaging** — Instant messages via WebSocket (AWS API Gateway V2).
- 🎙️ **Voice Messaging** — Native browser `MediaRecorder` API recording, securely uploaded directly to AWS S3.
- 📱 **Responsive Design** — Glassmorphic, mobile-first, and dynamic UI built with Vanilla CSS.
- 🌙 **Dark Theme** — Professional navy aesthetic with seamless Light & Dark modes natively toggled.
- 👤 **User Profiles** — Editable display names and dynamic avatar gradients based on user profiles.
- ⚡ **Serverless Backend** — AWS Lambda (Node.js) + Amazon DynamoDB for strict consistency and low-latency storage.

---

## 🏗️ High-Level Architecture

The platform follows a decoupled serverless architecture built exclusively on AWS services and native browser technologies. 

- **Frontend:** Pure HTML/CSS/JavaScript (Vanilla SPA paradigm) utilizing an internal state engine. 
- **Authentication:** AWS Cognito (User Pools) with SMS multi-factor authentication.
- **APIs:** AWS API Gateway. One handles standard REST requests, the other manages stateful WebSocket connections.
- **Compute:** AWS Lambda functions written in Node.js handle all business logic securely.
- **Database:** Amazon DynamoDB provides low-latency, strictly consistent data storage using single-table design concepts spread across multi-purpose optimized tables.
- **Storage:** Amazon S3 stores user media such as voice messages and file attachments via short-lived Pre-Signed URLs.

---

## 🖥️ Frontend Overview

The frontend is a lightweight Single Page Application (SPA) that avoids heavy frameworks like React in favor of vanilla JavaScript (`app.js`) traversing a central `state` object. 

### Core Concepts
- **State Management:** A global `state` object acts as the source of truth for the active conversation, typing users, messages, and UI view status.
- **Authentication Flow (`AuthService`):** Connects to `amazon-cognito-identity-js` explicitly to handle session tokens, user sign ups, and session restorations.
- **WebSocket Service (`WsService`):** Maintains the persistent connection to AWS API Gateway. Responsible for pinging the socket and reacting to real-time events (`newMessage`, `userStatus`, `typing`, `messageDeleted`).
- **Media Engine:** Integrates the browser's native `MediaRecorder` API to capture microphone data, convert it to WebM format (`audio/webm`), and relay it to S3 for persistent voice messages.

---

## ⚡ Backend Services (AWS Node.js Lambdas)

The backend is deployed via the AWS Serverless Application Model (SAM). The functions are broken into two primary groups:

### 🔌 WebSocket Endpoints (Real-Time)
- **`connect` / `disconnect`:** Manages the lifecycle of a user's browser connection. Writes/removes entries in the `ConnectionsTable`. When invoked, broadcasts the user's online/offline status to active chat participants.
- **`sendMessage`:** Receives the message, generates a chronologically sortable ID (`timestamp_uuid`), commits the message to DynamoDB `MessagesTable`, updates the `ConversationsTable` previews, and fans out the payload to both sender and receiver sockets.
- **`typing`:** Highly ephemeral endpoint passing typing indicator flags to recipients.
- **`deleteMessage`:** Removes a specific message entity and alerts the recipient's UI to hide the message bubble.

### 🌐 REST API Endpoints (CRUD)
- **`createConversation`:** Validates recipient logic and creates dual entries in `ConversationsTable`.
- **`getChats` / `getMessages`:** Queries the DynamoDB tables for historical logs. `getMessages` explicitly sorts in reverse chronological order to deliver the newest chats first. 
- **`searchUsers`:** Connects to Cognito's Identity Provider to query registered users.
- **`updateProfile` / `syncUser`:** Maps Cognito credentials to the DynamoDB `UsersTable`.
- **`getUploadUrl` / `getDownloadUrl`:** Provisions S3 Pre-Signed URLs allowing the frontend to securely natively upload/download heavy media files (like voice memos) without passing through Lambda limits.
- **`deleteUser`:** Destructive teardown automation traversing AWS resources to purge all traces of a user profile.

---

## 🗄️ Database Schema (DynamoDB)

DynamoDB uses an explicitly decoupled single-responsibility table pattern optimized for highly scalable access.

### `UsersTable`
- **Partition Key (PK):** `userId` (String)

### `ConversationsTable`
- **Partition Key (PK):** `conversationId` (String)
- **Sort Key (SK):** `userId` (String)
- **Global Secondary Index:** `UserConversationsIndex` (PK: `userId`, SK: `lastMessageAt`)

### `MessagesTable`
- **Partition Key (PK):** `conversationId` (String)
- **Sort Key (SK):** `messageId` (String) 
*(Note: `messageId` utilizes a timestamp prefix to ensure native DynamoDB chronologic sorting queries operate perfectly).*

### `ConnectionsTable`
- **Partition Key (PK):** `connectionId` (String)
- **Global Secondary Index:** `UserConnectionIndex` (PK: `userId`) 

---

## 🔄 Operational Workflow Example: Sending a Voice Message

1. **Frontend:** The user holds the microphone hardware button. `navigator.mediaDevices` streams an audio blob into `MediaRecorder`.
2. **Rest API:** The frontend asks `/upload-url` for a secure S3 pipeline.
3. **Upload:** The web browser bypasses the backend and uploads `.webm` audio directly into S3. 
4. **WebSocket:** The frontend sends a `sendMessage` action to the WebSocket API containing the new S3 bucket path prefix.
5. **Lambda:** The backend securely writes this S3 pointer into the `MessagesTable` and looks up the recipient's current socket `connectionId`.
6. **Delivery:** The API Gateway WebSocket pushes the payload to the recipient's computer. 
7. **Resolution:** The recipient's computer receives the message, pings the REST API `/download-url` for a temporary pass, and the HTML `<audio>` tag renders the content flawlessly.

---

## 🚀 Deployment

The backend can be easily deployed using AWS SAM:

```bash
cd backend
npm install
sam build
sam deploy --guided
```

Configure your `.env` in the frontend directory based on the SAM output parameters (`WebSocketUrl`, `RestApiUrl`, `UserPoolId`, `ClientId`).

---

## 📄 License
MIT License
