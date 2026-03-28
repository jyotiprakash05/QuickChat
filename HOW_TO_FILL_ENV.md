# How to Fill .env File - Step by Step Guide

## Quick Overview

You need to fill 5 values in `frontend/.env`:

```env
VITE_COGNITO_USER_POOL_ID=us-east-1_XXXXXXXXX
VITE_COGNITO_CLIENT_ID=xxxxxxxxxxxxxxxxxxxxxxxxxx
VITE_WEBSOCKET_URL=wss://xxxxx.execute-api.us-east-1.amazonaws.com/prod
VITE_API_URL=https://xxxxx.execute-api.us-east-1.amazonaws.com/prod
VITE_ATTACHMENTS_BUCKET=quickchat-attachments-xxxxxxxxxxxx
```

---

## Step 1: Create the .env File

```bash
cd frontend
copy ..\.env.example .env
```

Or manually create `frontend/.env` file.

---

## Step 2: Deploy Backend (If Not Done)

```bash
cd backend
sam build
sam deploy --guided
```

**During deployment, answer:**
- Stack Name: `quickchat-backend`
- AWS Region: `us-east-1` (or your preferred region)
- Confirm changes: `Y`
- Allow SAM CLI IAM role creation: `Y`
- Save arguments: `Y`

**After deployment completes, you'll see outputs like:**

```
CloudFormation outputs from deployed stack
---------------------------------------------------------------------------
Outputs
---------------------------------------------------------------------------
Key                 WebSocketUrl
Description         WebSocket API URL
Value               wss://abc123xyz.execute-api.us-east-1.amazonaws.com/prod

Key                 RestApiUrl
Description         REST API URL
Value               https://def456uvw.execute-api.us-east-1.amazonaws.com/prod

Key                 AttachmentsBucketName
Value               quickchat-attachments-123456789012
---------------------------------------------------------------------------
```

**Copy these 3 values:**
1. ✅ `WebSocketUrl` → Put in `VITE_WEBSOCKET_URL`
2. ✅ `RestApiUrl` → Put in `VITE_API_URL`
3. ✅ `AttachmentsBucketName` → Put in `VITE_ATTACHMENTS_BUCKET`

---

## Step 3: Create Cognito User Pool

### Option A: AWS Console (Easiest)

1. **Go to AWS Console** → Search "Cognito" → Click "Cognito"

2. **Click "Create user pool"**

3. **Step 1 - Configure sign-in experience:**
   - Cognito user pool sign-in options: ✅ Email
   - Click "Next"

4. **Step 2 - Configure security requirements:**
   - Password policy: Keep default (Cognito defaults)
   - Multi-factor authentication: No MFA
   - Click "Next"

5. **Step 3 - Configure sign-up experience:**
   - Self-registration: ✅ Enable self-registration
   - Attribute verification: ✅ Send email message, verify email address
   - Required attributes: ✅ email
   - Click "Next"

6. **Step 4 - Configure message delivery:**
   - Email provider: ✅ Send email with Cognito
   - Click "Next"

7. **Step 5 - Integrate your app:**
   - User pool name: `QuickChat-Users`
   - App client name: `QuickChat-Web`
   - Client secret: ✅ Don't generate a client secret
   - Click "Next"

8. **Step 6 - Review and create:**
   - Click "Create user pool"

9. **Copy the values:**
   - You'll see: **User pool ID** (e.g., `us-east-1_AbCdEfGhI`)
   - ✅ Copy this → Put in `VITE_COGNITO_USER_POOL_ID`

10. **Get App Client ID:**
    - Click on your user pool
    - Go to "App integration" tab
    - Scroll down to "App clients and analytics"
    - Click on "QuickChat-Web"
    - Copy **Client ID** (e.g., `1a2b3c4d5e6f7g8h9i0j1k2l3m`)
    - ✅ Copy this → Put in `VITE_COGNITO_CLIENT_ID`

### Option B: AWS CLI

```bash
# Create User Pool
aws cognito-idp create-user-pool --pool-name QuickChat-Users --auto-verified-attributes email --username-attributes email

# Note the "Id" from output → VITE_COGNITO_USER_POOL_ID

# Create App Client (replace YOUR_USER_POOL_ID)
aws cognito-idp create-user-pool-client --user-pool-id YOUR_USER_POOL_ID --client-name QuickChat-Web --no-generate-secret

# Note the "ClientId" from output → VITE_COGNITO_CLIENT_ID
```

---

## Step 4: Fill the .env File

Open `frontend/.env` and fill in all values:

```env
# Amazon Cognito (from Step 3)
VITE_COGNITO_USER_POOL_ID=us-east-1_AbCdEfGhI
VITE_COGNITO_CLIENT_ID=1a2b3c4d5e6f7g8h9i0j1k2l3m

# API Gateway (from Step 2)
VITE_WEBSOCKET_URL=wss://abc123xyz.execute-api.us-east-1.amazonaws.com/prod
VITE_API_URL=https://def456uvw.execute-api.us-east-1.amazonaws.com/prod

# S3 Bucket (from Step 2)
VITE_ATTACHMENTS_BUCKET=quickchat-attachments-123456789012
```

---

## Step 5: Verify Your Configuration

```bash
cd frontend
type .env
```

You should see all 5 values filled (no XXXXXXXXX placeholders).

---

## Step 6: Test the Application

```bash
cd frontend
npm install
npm run dev
```

Visit `http://localhost:5173`

**Test:**
1. ✅ Click "Sign Up"
2. ✅ Enter email and password
3. ✅ Check email for verification code
4. ✅ Enter code to verify
5. ✅ Login with your credentials
6. ✅ Send a message
7. ✅ Upload a file

---

## Alternative: Use Demo Mode (No AWS Setup)

If you want to test the UI without AWS:

**Delete or leave .env empty:**
```bash
# frontend/.env
# Leave empty or delete the file
```

The app will run in **Demo Mode** with mock data!

---

## Troubleshooting

### "Cannot find .env file"
```bash
cd frontend
echo. > .env
# Then fill it manually
```

### "SAM deploy failed"
- Check AWS CLI is configured: `aws sts get-caller-identity`
- Ensure you have permissions to create CloudFormation stacks

### "Cognito User Pool creation failed"
- Check region matches your backend deployment
- Ensure IAM user has Cognito permissions

### "Values still show XXXXXXXXX"
- You need to replace the X's with actual values from AWS
- Follow Steps 2 and 3 above

### "App shows 'Demo Mode'"
- This means .env is empty or missing
- Fill the .env file with real AWS values

---

## Quick Reference - Where Each Value Comes From

| Variable | Source | How to Get |
|----------|--------|------------|
| `VITE_COGNITO_USER_POOL_ID` | Cognito | AWS Console → Cognito → User pools → Copy "User pool ID" |
| `VITE_COGNITO_CLIENT_ID` | Cognito | User pool → App integration → App clients → Copy "Client ID" |
| `VITE_WEBSOCKET_URL` | SAM Deploy | Output after `sam deploy` OR CloudFormation → Outputs |
| `VITE_API_URL` | SAM Deploy | Output after `sam deploy` OR CloudFormation → Outputs |
| `VITE_ATTACHMENTS_BUCKET` | SAM Deploy | Output after `sam deploy` OR CloudFormation → Outputs |

---

## Example of Filled .env File

```env
VITE_COGNITO_USER_POOL_ID=us-east-1_9ExAmPlE1
VITE_COGNITO_CLIENT_ID=7exampleclientid123456789
VITE_WEBSOCKET_URL=wss://a1b2c3d4e5.execute-api.us-east-1.amazonaws.com/prod
VITE_API_URL=https://f6g7h8i9j0.execute-api.us-east-1.amazonaws.com/prod
VITE_ATTACHMENTS_BUCKET=quickchat-attachments-987654321098
```

**Note:** These are example values. Use YOUR actual values from AWS!

---

## Need Help?

Run the automated script to fetch values:
```bash
npm install
npm run fetch
```

This will auto-populate the .env file for you!
