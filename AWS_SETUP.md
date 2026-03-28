# AWS Setup Guide - Fetch All Keys

## Prerequisites

1. **Install AWS CLI**
   ```bash
   # Download from: https://aws.amazon.com/cli/
   # Verify installation:
   aws --version
   ```

2. **Configure AWS Credentials**
   ```bash
   aws configure
   # Enter:
   # - AWS Access Key ID
   # - AWS Secret Access Key
   # - Default region (e.g., us-east-1)
   # - Default output format: json
   ```

## Method 1: Automated Script (Recommended)

```bash
# Install dependencies
npm install

# Run the fetcher script
npm run fetch
```

This will:
- ✅ Fetch CloudFormation stack outputs
- ✅ Find Cognito User Pool and App Client
- ✅ Get API Gateway WebSocket URL
- ✅ Get REST API URL
- ✅ Find S3 attachments bucket
- ✅ Auto-generate `frontend/.env` file

## Method 2: Windows Batch Script

```bash
# Run the batch script
fetch-aws-keys.bat
```

## Method 3: Manual AWS CLI Commands

### 1. Get CloudFormation Stack Outputs
```bash
aws cloudformation describe-stacks --stack-name quickchat-backend --query "Stacks[0].Outputs" --output table
```

Look for:
- `WebSocketUrl` → VITE_WEBSOCKET_URL
- `RestApiUrl` → VITE_API_URL
- `AttachmentsBucketName` → VITE_ATTACHMENTS_BUCKET

### 2. Get Cognito User Pool ID
```bash
aws cognito-idp list-user-pools --max-results 10
```

Find your QuickChat pool and copy the `Id` → VITE_COGNITO_USER_POOL_ID

### 3. Get Cognito App Client ID
```bash
aws cognito-idp list-user-pool-clients --user-pool-id YOUR_USER_POOL_ID
```

Copy the `ClientId` → VITE_COGNITO_CLIENT_ID

### 4. Get API Gateway WebSocket URL
```bash
aws apigatewayv2 get-apis --query "Items[?ProtocolType=='WEBSOCKET']"
```

Format: `wss://{ApiId}.execute-api.{region}.amazonaws.com/prod`

### 5. Get S3 Bucket Name
```bash
aws s3 ls | findstr quickchat
```

## Method 4: AWS Console (Manual)

### CloudFormation
1. Go to AWS Console → CloudFormation
2. Select stack: `quickchat-backend`
3. Click "Outputs" tab
4. Copy all values

### Cognito
1. Go to AWS Console → Cognito
2. Select your User Pool
3. Copy "User Pool ID"
4. Go to "App integration" → "App clients"
5. Copy "Client ID"

### API Gateway
1. Go to AWS Console → API Gateway
2. Find "QuickChat-WebSocket"
3. Copy the WebSocket URL from "Stages" → "prod"
4. Find "QuickChat-REST"
5. Copy the Invoke URL

### S3
1. Go to AWS Console → S3
2. Find bucket starting with "quickchat-attachments-"
3. Copy bucket name

## Create .env File

Create `frontend/.env`:

```env
# Amazon Cognito
VITE_COGNITO_USER_POOL_ID=us-east-1_XXXXXXXXX
VITE_COGNITO_CLIENT_ID=xxxxxxxxxxxxxxxxxxxxxxxxxx

# API Gateway
VITE_WEBSOCKET_URL=wss://xxxxx.execute-api.us-east-1.amazonaws.com/prod
VITE_API_URL=https://xxxxx.execute-api.us-east-1.amazonaws.com/prod

# S3 Bucket
VITE_ATTACHMENTS_BUCKET=quickchat-attachments-xxxxxxxxxxxx
```

## Troubleshooting

**"Stack not found"**
- Deploy backend first: `cd backend && sam deploy --guided`

**"Access Denied"**
- Check AWS credentials: `aws sts get-caller-identity`
- Ensure IAM user has permissions for CloudFormation, Cognito, API Gateway, S3

**"No User Pool found"**
- Create Cognito User Pool manually in AWS Console
- See DEPLOYMENT.md for detailed steps

**"Region mismatch"**
- Ensure all resources are in the same region
- Set region: `export AWS_REGION=us-east-1` (Linux/Mac) or `set AWS_REGION=us-east-1` (Windows)

## Quick Start After Fetching Keys

```bash
cd frontend
npm install
npm run dev
```

Visit `http://localhost:5173` and test your app!
