@echo off
REM QuickChat AWS Resource Fetcher
REM This script retrieves all necessary AWS resource IDs for your .env file

echo ========================================
echo QuickChat AWS Resource Fetcher
echo ========================================
echo.

REM Check if AWS CLI is installed
aws --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: AWS CLI is not installed
    echo Install from: https://aws.amazon.com/cli/
    exit /b 1
)

echo Fetching AWS resources...
echo.

REM Get CloudFormation Stack Outputs
echo [1/5] Fetching CloudFormation Stack Outputs...
aws cloudformation describe-stacks --stack-name quickchat-backend --query "Stacks[0].Outputs" --output table 2>nul
if %errorlevel% neq 0 (
    echo WARNING: Stack 'quickchat-backend' not found. Have you deployed the backend?
    echo Run: cd backend ^&^& sam deploy --guided
    echo.
)

REM Get Cognito User Pools
echo [2/5] Fetching Cognito User Pools...
aws cognito-idp list-user-pools --max-results 10 --query "UserPools[?contains(Name, 'QuickChat') || contains(Name, 'quickchat')].{Name:Name,ID:Id}" --output table 2>nul
if %errorlevel% neq 0 (
    echo WARNING: No Cognito User Pools found
    echo.
)

REM Get Cognito App Clients (requires User Pool ID)
echo [3/5] To get Cognito App Client ID, run:
echo aws cognito-idp list-user-pool-clients --user-pool-id YOUR_USER_POOL_ID
echo.

REM Get API Gateway WebSocket APIs
echo [4/5] Fetching API Gateway WebSocket APIs...
aws apigatewayv2 get-apis --query "Items[?ProtocolType=='WEBSOCKET' && (contains(Name, 'QuickChat') || contains(Name, 'quickchat'))].{Name:Name,ID:ApiId,Endpoint:ApiEndpoint}" --output table 2>nul
if %errorlevel% neq 0 (
    echo WARNING: No WebSocket APIs found
    echo.
)

REM Get S3 Buckets
echo [5/5] Fetching S3 Buckets...
aws s3 ls | findstr quickchat 2>nul
if %errorlevel% neq 0 (
    echo WARNING: No QuickChat S3 buckets found
    echo.
)

echo.
echo ========================================
echo Next Steps:
echo ========================================
echo 1. Copy the values above
echo 2. Update frontend/.env file
echo 3. Format:
echo    VITE_COGNITO_USER_POOL_ID=us-east-1_XXXXXXXXX
echo    VITE_COGNITO_CLIENT_ID=xxxxxxxxxxxxxxxxxxxxxxxxxx
echo    VITE_WEBSOCKET_URL=wss://xxxxx.execute-api.region.amazonaws.com/prod
echo    VITE_API_URL=https://xxxxx.execute-api.region.amazonaws.com/prod
echo    VITE_ATTACHMENTS_BUCKET=quickchat-attachments-xxxxxxxxxxxx
echo.
pause
