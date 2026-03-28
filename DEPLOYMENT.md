# QuickChat AWS Deployment Guide

## Complete AWS Services Integration

Your chat app now uses:
- **Amazon Cognito** - User authentication
- **DynamoDB** - Data storage (users, conversations, messages, connections)
- **API Gateway WebSocket** - Real-time messaging
- **API Gateway REST** - HTTP endpoints
- **AWS Lambda** - Serverless functions
- **Amazon S3** - File attachments storage

## Deployment Steps

### 1. Deploy Backend with SAM

```bash
cd backend

# Install dependencies for all Lambda functions
npm install
cd lambdas/getUploadUrl && npm install && cd ../..

# Build and deploy
sam build
sam deploy --guided
```

During deployment, provide:
- Stack name: `quickchat-backend`
- AWS Region: `us-east-1` (or your preferred region)
- Confirm changes: `Y`
- Allow SAM CLI IAM role creation: `Y`
- Save arguments to config: `Y`

### 2. Note the Outputs

After deployment, save these values:
```
WebSocketUrl: wss://xxxxx.execute-api.us-east-1.amazonaws.com/prod
RestApiUrl: https://xxxxx.execute-api.us-east-1.amazonaws.com/prod
AttachmentsBucketName: quickchat-attachments-xxxxxxxxxxxx
```

### 3. Create Cognito User Pool

```bash
# Via AWS Console:
1. Go to Amazon Cognito → Create User Pool
2. Sign-in options: Email
3. Password policy: Default
4. MFA: Optional (No MFA for demo)
5. User account recovery: Email only
6. Self-registration: Enabled
7. Attributes: email (required)
8. Email provider: Send email with Cognito
9. App client: Public client (no secret)
10. Create pool

# Note the values:
User Pool ID: us-east-1_XXXXXXXXX
App Client ID: xxxxxxxxxxxxxxxxxxxxxxxxxx
```

### 4. Configure Frontend

```bash
cd frontend
cp ../.env.example .env
```

Edit `.env`:
```env
VITE_COGNITO_USER_POOL_ID=us-east-1_XXXXXXXXX
VITE_COGNITO_CLIENT_ID=xxxxxxxxxxxxxxxxxxxxxxxxxx
VITE_WEBSOCKET_URL=wss://xxxxx.execute-api.us-east-1.amazonaws.com/prod
VITE_API_URL=https://xxxxx.execute-api.us-east-1.amazonaws.com/prod
VITE_ATTACHMENTS_BUCKET=quickchat-attachments-xxxxxxxxxxxx
```

### 5. Test Locally

```bash
cd frontend
npm install
npm run dev
```

Visit `http://localhost:5173` and test:
- Sign up with email
- Login
- Send messages
- Upload files (images, PDFs, docs)

### 6. Deploy Frontend to AWS Amplify

```bash
# Push to GitHub
git add .
git commit -m "Add S3 file upload support"
git push origin main

# In AWS Console:
1. Go to AWS Amplify → New App → Host Web App
2. Connect GitHub repository
3. Build settings: Auto-detected (uses amplify.yml)
4. Environment variables:
   - VITE_COGNITO_USER_POOL_ID
   - VITE_COGNITO_CLIENT_ID
   - VITE_WEBSOCKET_URL
   - VITE_API_URL
   - VITE_ATTACHMENTS_BUCKET
5. Deploy
```

## Architecture Overview

```
┌─────────────┐     ┌──────────────┐     ┌─────────────┐
│  React App  │────▶│   Cognito    │     │  DynamoDB   │
│  (Amplify)  │     │   (Auth)     │     │  (Storage)  │
└──────┬──────┘     └──────────────┘     └──────▲──────┘
       │                                         │
       ├─ WebSocket ─▶ API Gateway WS ─▶ Lambda ┤
       │                                         │
       ├─ REST ──────▶ API Gateway REST ▶ Lambda┤
       │                                         │
       └─ Upload ────▶ S3 Presigned URL ▶ S3 Bucket
```

## File Upload Flow

1. User selects file in chat
2. Frontend requests presigned URL from `/upload-url` endpoint
3. Lambda generates S3 presigned URL (valid 5 minutes)
4. Frontend uploads file directly to S3 using presigned URL
5. Message sent with attachment metadata (URL, name, type, size)
6. Recipients see file preview or download link

## Cost Estimate (Monthly)

For 1000 users, 10K messages/day:
- **Cognito**: $0 (first 50K MAU free)
- **DynamoDB**: ~$2.50 (on-demand pricing)
- **API Gateway**: ~$3.50 (WebSocket + REST)
- **Lambda**: ~$0.20 (free tier covers most)
- **S3**: ~$0.50 (1GB storage + requests)
- **Total**: ~$7/month

## Security Features

✅ S3 bucket has public access blocked
✅ Files accessed via presigned URLs only
✅ CORS configured for your domain
✅ Cognito JWT authentication
✅ IAM least-privilege policies

## Cleanup

To delete all resources:
```bash
# Delete CloudFormation stack
sam delete --stack-name quickchat-backend

# Delete Cognito User Pool (manual via console)
# Delete Amplify App (manual via console)
```

## Troubleshooting

**File upload fails:**
- Check VITE_API_URL is correct
- Verify Lambda has S3 permissions
- Check browser console for CORS errors

**Messages not real-time:**
- Verify WebSocket URL is correct
- Check Lambda has execute-api:ManageConnections permission

**Authentication fails:**
- Verify Cognito User Pool ID and Client ID
- Check user is confirmed (check email)
