# .env File Setup - Visual Guide

## 📋 What You Need

```
frontend/.env file needs 5 values:
┌─────────────────────────────────────────────────────────────┐
│ VITE_COGNITO_USER_POOL_ID=us-east-1_XXXXXXXXX              │ ← From Cognito
│ VITE_COGNITO_CLIENT_ID=xxxxxxxxxxxxxxxxxxxxxxxxxx          │ ← From Cognito
│ VITE_WEBSOCKET_URL=wss://xxxxx.execute-api...amazonaws.com │ ← From SAM Deploy
│ VITE_API_URL=https://xxxxx.execute-api...amazonaws.com     │ ← From SAM Deploy
│ VITE_ATTACHMENTS_BUCKET=quickchat-attachments-xxxxxxxxxxxx │ ← From SAM Deploy
└─────────────────────────────────────────────────────────────┘
```

---

## 🚀 Quick Setup (3 Steps)

### Step 1️⃣: Deploy Backend

```bash
cd backend
sam deploy --guided
```

**You'll see this output:**
```
Outputs
---------------------------------------------------------------------------
WebSocketUrl        wss://abc123.execute-api.us-east-1.amazonaws.com/prod
RestApiUrl          https://def456.execute-api.us-east-1.amazonaws.com/prod
AttachmentsBucket   quickchat-attachments-123456789012
```

✅ **Copy these 3 values!**

---

### Step 2️⃣: Create Cognito User Pool

**AWS Console → Cognito → Create user pool**

Follow the wizard:
1. Sign-in: Email ✅
2. Password: Default ✅
3. MFA: No MFA ✅
4. Self-registration: Enabled ✅
5. Email: Cognito ✅
6. Pool name: `QuickChat-Users`
7. App client: `QuickChat-Web` (no secret) ✅
8. Create ✅

**You'll get:**
```
User pool ID: us-east-1_AbCdEfGhI
Client ID: 1a2b3c4d5e6f7g8h9i0j1k2l3m
```

✅ **Copy these 2 values!**

---

### Step 3️⃣: Create .env File

```bash
cd frontend
copy ..\.env.example .env
notepad .env
```

**Paste your values:**
```env
VITE_COGNITO_USER_POOL_ID=us-east-1_AbCdEfGhI
VITE_COGNITO_CLIENT_ID=1a2b3c4d5e6f7g8h9i0j1k2l3m
VITE_WEBSOCKET_URL=wss://abc123.execute-api.us-east-1.amazonaws.com/prod
VITE_API_URL=https://def456.execute-api.us-east-1.amazonaws.com/prod
VITE_ATTACHMENTS_BUCKET=quickchat-attachments-123456789012
```

Save and close! ✅

---

## 🎯 Where to Find Each Value

### 1. VITE_COGNITO_USER_POOL_ID

```
AWS Console → Cognito → User pools → Click your pool
┌─────────────────────────────────────────┐
│ QuickChat-Users                         │
│ User pool ID: us-east-1_AbCdEfGhI  ← COPY THIS
│ ARN: arn:aws:cognito-idp:...            │
└─────────────────────────────────────────┘
```

### 2. VITE_COGNITO_CLIENT_ID

```
AWS Console → Cognito → User pools → Your pool → App integration tab
Scroll down to "App clients and analytics"
┌─────────────────────────────────────────┐
│ QuickChat-Web                           │
│ Client ID: 1a2b3c4d5e6f7g8h9i0j1k  ← COPY THIS
│ Client secret: N/A                      │
└─────────────────────────────────────────┘
```

### 3. VITE_WEBSOCKET_URL

```
After sam deploy, look for:
┌─────────────────────────────────────────────────────────────┐
│ Key: WebSocketUrl                                           │
│ Value: wss://abc123.execute-api.us-east-1.amazonaws.com/prod  ← COPY THIS
└─────────────────────────────────────────────────────────────┘

OR

AWS Console → CloudFormation → quickchat-backend → Outputs tab
```

### 4. VITE_API_URL

```
After sam deploy, look for:
┌─────────────────────────────────────────────────────────────┐
│ Key: RestApiUrl                                             │
│ Value: https://def456.execute-api.us-east-1.amazonaws.com/prod  ← COPY THIS
└─────────────────────────────────────────────────────────────┘
```

### 5. VITE_ATTACHMENTS_BUCKET

```
After sam deploy, look for:
┌─────────────────────────────────────────────────────────────┐
│ Key: AttachmentsBucketName                                  │
│ Value: quickchat-attachments-123456789012  ← COPY THIS     │
└─────────────────────────────────────────────────────────────┘
```

---

## ✅ Verify Your Setup

```bash
# Check .env file exists and has values
cd frontend
type .env

# Should show:
# VITE_COGNITO_USER_POOL_ID=us-east-1_...
# VITE_COGNITO_CLIENT_ID=...
# VITE_WEBSOCKET_URL=wss://...
# VITE_API_URL=https://...
# VITE_ATTACHMENTS_BUCKET=quickchat-attachments-...
```

**No XXXXXXXXX should remain!**

---

## 🧪 Test It

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173`

1. Click "Sign Up"
2. Enter email: `test@example.com`
3. Enter password: `Test123!`
4. Check email for verification code
5. Login and chat!

---

## 🆘 Common Issues

### ❌ "All values show XXXXXXXXX"
**Fix:** You need to replace them with real values from AWS (see above)

### ❌ "sam deploy failed"
**Fix:** 
```bash
aws configure
# Enter your AWS credentials
```

### ❌ "Cannot create Cognito pool"
**Fix:** Check you're in the correct AWS region (same as backend)

### ❌ "App shows Demo Mode"
**Fix:** .env file is empty or missing. Fill it with real values.

### ❌ "File upload doesn't work"
**Fix:** Check VITE_ATTACHMENTS_BUCKET is correct

---

## 🎁 Bonus: Auto-Fill Script

Don't want to do this manually?

```bash
# Run this from project root
npm install
npm run fetch
```

This will automatically:
- ✅ Find all AWS resources
- ✅ Create frontend/.env file
- ✅ Fill in all values

---

## 📝 Example of Complete .env

```env
# Real example (your values will be different)
VITE_COGNITO_USER_POOL_ID=us-east-1_9ExAmPlE1
VITE_COGNITO_CLIENT_ID=7exampleclientid123456789
VITE_WEBSOCKET_URL=wss://a1b2c3d4e5.execute-api.us-east-1.amazonaws.com/prod
VITE_API_URL=https://f6g7h8i9j0.execute-api.us-east-1.amazonaws.com/prod
VITE_ATTACHMENTS_BUCKET=quickchat-attachments-987654321098
```

**That's it! You're ready to go! 🚀**
