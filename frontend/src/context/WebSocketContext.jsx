import { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';
import { CONFIG, IS_DEMO_MODE } from '../utils/constants';
import { useAuth } from './AuthContext';

const WebSocketContext = createContext(null);

export function WebSocketProvider({ children }) {
  const { user } = useAuth();
  const [isConnected, setIsConnected] = useState(false);
  const [connectionError, setConnectionError] = useState(null);
  const wsRef = useRef(null);
  const reconnectTimeoutRef = useRef(null);
  const reconnectAttemptsRef = useRef(0);

  const connect = useCallback(() => {
    if (IS_DEMO_MODE || !CONFIG.WEBSOCKET_URL) {
      // In demo mode, simulate connected state
      setIsConnected(true);
      return;
    }

    try {
      const ws = new WebSocket(`${CONFIG.WEBSOCKET_URL}?userId=${user?.userId}`);

      ws.onopen = () => {
        setIsConnected(true);
        setConnectionError(null);
        reconnectAttemptsRef.current = 0;
      };

      ws.onclose = () => {
        setIsConnected(false);
        // Attempt reconnection with exponential backoff
        const delay = Math.min(1000 * Math.pow(2, reconnectAttemptsRef.current), 30000);
        reconnectTimeoutRef.current = setTimeout(() => {
          reconnectAttemptsRef.current += 1;
          connect();
        }, delay);
      };

      ws.onerror = (error) => {
        setConnectionError('Connection error. Retrying...');
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          // Dispatch event for ChatContext to handle
          window.dispatchEvent(new CustomEvent('ws-message', { detail: data }));
        } catch (e) {
          console.error('Failed to parse WebSocket message:', e);
        }
      };

      wsRef.current = ws;
    } catch (err) {
      setConnectionError('Failed to connect to chat server');
    }
  }, [user]);

  const disconnect = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
    }
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
    setIsConnected(false);
  }, []);

  const sendWSMessage = useCallback((action, payload) => {
    if (IS_DEMO_MODE) return;
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ action, ...payload }));
    }
  }, []);

  useEffect(() => {
    if (user) {
      connect();
    }
    return () => disconnect();
  }, [user, connect, disconnect]);

  return (
    <WebSocketContext.Provider value={{ isConnected, connectionError, sendWSMessage, disconnect }}>
      {children}
    </WebSocketContext.Provider>
  );
}

export function useWebSocket() {
  const context = useContext(WebSocketContext);
  if (!context) throw new Error('useWebSocket must be used within a WebSocketProvider');
  return context;
}

export default WebSocketContext;
