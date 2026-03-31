// ============================================
// QuickChat — AWS Configuration
// ============================================

const CONFIG = {
  COGNITO_USER_POOL_ID: 'ap-south-1_uj1gasnQh',
  COGNITO_CLIENT_ID: '1hfl8fo588cb267fd4de7q8o9l',
  WEBSOCKET_URL: 'wss://jaxt61wg41.execute-api.ap-south-1.amazonaws.com/prod',
  API_URL: 'https://dm2fg58ba3.execute-api.ap-south-1.amazonaws.com/prod',  // NEW LIVE AWS REST API URL
  ATTACHMENTS_BUCKET: 'quickchat-v2-attachmentsbucket-5cyyjtxnt7vi',
  AWS_REGION: 'ap-south-1',
};

// Check if we have real AWS config
CONFIG.IS_LIVE = !!(CONFIG.COGNITO_USER_POOL_ID && CONFIG.COGNITO_CLIENT_ID && CONFIG.API_URL);
