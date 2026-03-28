# QuickChat 💬

A modern, real-time chat application built with React, Vite, Tailwind CSS, and AWS serverless services.

![QuickChat](https://img.shields.io/badge/QuickChat-v1.0-4A90E2?style=for-the-badge) ![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react) ![AWS](https://img.shields.io/badge/AWS-Serverless-FF9900?style=flat-square&logo=amazon-aws) ![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat-square&logo=vite)

## ✨ Features

- 🔐 **Authentication** — Sign up and login with AWS Cognito (demo mode available)
- 💬 **Real-Time Messaging** — Instant messages via WebSocket (API Gateway)
- 📱 **Responsive Design** — Mobile-first, works on all screen sizes
- 🌙 **Dark Theme** — Professional navy + electric blue aesthetic
- 👤 **User Profiles** — Editable profile with avatar and settings
- 🔍 **Search** — Filter conversations by name or message content
- ⚡ **Serverless Backend** — Lambda + DynamoDB, pay-per-use
- 📦 **Mock Data** — Full demo mode with realistic sample conversations

## 🏗️ Architecture

```
┌─────────────┐     ┌──────────────────┐     ┌─────────────┐
│  React App  │────▶│  Amazon Cognito  │     │  DynamoDB   │
│  (Amplify)  │     │  (Auth)          │     │  (Storage)  │
└──────┬──────┘     └──────────────────┘     └──────▲──────┘
       │                                            │
       ├──── WebSocket ──▶ API Gateway WS ──▶ Lambda ────┤
       │                                            │
       └──── REST ──────▶ API Gateway REST ──▶ Lambda ───┘
```

### DynamoDB Tables

| Table | PK | SK | GSI |
|-------|----|----|-----|
| Users | userId | — | — |
| Conversations | conversationId | — | UserConversationsIndex (userId, lastMessageAt) |
| Messages | conversationId | messageId | — |
| Connections | connectionId | — | UserConnectionIndex (userId) |

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- AWS CLI and SAM CLI (for backend deployment)
- AWS Account (optional — app works in demo mode)

### Frontend (Local Development)

```bash
cd frontend
npm install
npm run dev
```

The app starts at `http://localhost:5173` in **demo mode** with mock data.

### Backend Deployment

```bash
# Install backend dependencies
cd backend
npm install

# Deploy with SAM
sam build
sam deploy --guided
```

After deployment, note the outputs:
- `WebSocketUrl` — e.g., `wss://xxxxx.execute-api.us-east-1.amazonaws.com/prod`
- `RestApiUrl` — e.g., `https://xxxxx.execute-api.us-east-1.amazonaws.com/prod`

### Configure Environment

```bash
cp .env.example frontend/.env
```

Fill in the values from your AWS deployment.

## 📂 Project Structure

```
QuickChat/
├── frontend/              # React + Vite + Tailwind CSS
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   │   ├── auth/      # Login, Signup, AuthTabs
│   │   │   ├── chat/      # ChatList, ChatWindow, MessageBubble, etc.
│   │   │   ├── common/    # Avatar, Badge, LoadingSpinner, EmptyState
│   │   │   ├── layout/    # Sidebar, AppLayout
│   │   │   └── profile/   # ProfileSettings
│   │   ├── context/       # AuthContext, ChatContext, WebSocketContext
│   │   ├── pages/         # AuthPage, ChatPage
│   │   ├── utils/         # Constants, formatters, validators
│   │   └── data/          # Mock data for demo mode
│   └── ...
├── backend/               # AWS Lambda handlers
│   ├── lambdas/
│   │   ├── connect/       # WebSocket $connect
│   │   ├── disconnect/    # WebSocket $disconnect
│   │   ├── sendMessage/   # WebSocket sendMessage
│   │   ├── getMessages/   # REST GET /messages
│   │   ├── getChats/      # REST GET /chats
│   │   └── updateProfile/ # REST PUT /profile
│   ├── shared/            # DynamoDB client, response helpers
│   └── template.yaml      # SAM/CloudFormation template
├── .env.example
├── amplify.yml            # AWS Amplify build config
└── README.md
```

## ☁️ AWS Deployment Guide

### 1. Amazon Cognito (Authentication)

1. Go to **AWS Console → Cognito → Create User Pool**
2. Enable email sign-up
3. Create an **App Client** (no client secret)
4. Note the **User Pool ID** and **Client ID**

### 2. Backend (SAM)

```bash
cd backend
sam build
sam deploy --stack-name quickchat-backend \
  --capabilities CAPABILITY_IAM \
  --resolve-s3
```

### 3. API Gateway WebSocket

The SAM template automatically creates the WebSocket API with:
- `$connect` route → Connect Lambda
- `$disconnect` route → Disconnect Lambda
- `sendMessage` route → SendMessage Lambda

### 4. Frontend on AWS Amplify

1. Push the repo to GitHub
2. Go to **AWS Console → Amplify → New App → Host Web App**
3. Connect your GitHub repo
4. Set build settings (uses `amplify.yml` automatically)
5. Add environment variables in Amplify Console:
   - `VITE_COGNITO_USER_POOL_ID`
   - `VITE_COGNITO_CLIENT_ID`
   - `VITE_WEBSOCKET_URL`
   - `VITE_API_URL`
6. Deploy!

## 🎨 Design System

| Token | Value | Usage |
|-------|-------|-------|
| Navy 700 | `#1A1F36` | Primary background |
| Electric Blue | `#4A90E2` | Accent, CTAs, sent messages |
| Surface | `#1E2338` | Cards, elevated surfaces |
| White | `#FFFFFF` | Primary text |
| Gray 400 | `#9CA3AF` | Secondary text |

## 📝 Demo Mode

The app runs in **Demo Mode** when no AWS environment variables are configured. In this mode:
- Login with any email/password
- 7 sample conversations with realistic messages
- Auto-reply simulation for online contacts
- Full UI interaction (send messages, search, navigate)

## 📄 License

MIT License — feel free to use this as a starting point for your own chat application.
