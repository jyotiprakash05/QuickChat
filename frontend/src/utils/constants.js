// QuickChat Constants

export const APP_NAME = 'QuickChat';

export const COLORS = {
  navy: '#1A1F36',
  electric: '#4A90E2',
  surface: '#1E2338',
};

// Environment variables (with fallbacks for demo mode)
export const CONFIG = {
  COGNITO_USER_POOL_ID: import.meta.env.VITE_COGNITO_USER_POOL_ID || 'demo-pool',
  COGNITO_CLIENT_ID: import.meta.env.VITE_COGNITO_CLIENT_ID || 'demo-client',
  WEBSOCKET_URL: import.meta.env.VITE_WEBSOCKET_URL || '',
  API_URL: import.meta.env.VITE_API_URL || '',
};

export const IS_DEMO_MODE = !import.meta.env.VITE_API_URL;

export const MESSAGE_TYPES = {
  TEXT: 'text',
  IMAGE: 'image',
};

export const USER_STATUS = {
  ONLINE: 'online',
  OFFLINE: 'offline',
  AWAY: 'away',
};
