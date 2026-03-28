// ============================================
// QuickChat — API & WebSocket Service
// ============================================

const ApiService = (() => {
  // --- REST helpers ---
  async function request(method, path, body = null) {
    const token = AuthService.getToken();
    const opts = {
      method,
      headers: { 'Content-Type': 'application/json' },
    };
    if (token) opts.headers['Authorization'] = token;
    if (body) opts.body = JSON.stringify(body);
    const res = await fetch(`${CONFIG.API_URL}${path}`, opts);
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`);
    return data;
  }

  function getChats(userId) {
    return request('GET', `/chats?userId=${encodeURIComponent(userId)}`);
  }

  function getMessages(conversationId, limit = 50, lastKey = null) {
    let url = `/messages?conversationId=${encodeURIComponent(conversationId)}&limit=${limit}`;
    if (lastKey) url += `&lastKey=${encodeURIComponent(lastKey)}`;
    return request('GET', url);
  }

  function updateProfile(userId, displayName, avatarUrl) {
    const body = { userId };
    if (displayName !== undefined) body.displayName = displayName;
    if (avatarUrl !== undefined) body.avatarUrl = avatarUrl;
    return request('PUT', '/profile', body);
  }

  function getUploadUrl(fileName, fileType) {
    return request('POST', '/upload-url', { fileName, fileType });
  }

  async function uploadFile(file) {
    const { uploadUrl, fileUrl, key } = await getUploadUrl(file.name, file.type);
    await fetch(uploadUrl, { method: 'PUT', headers: { 'Content-Type': file.type }, body: file });
    return { fileUrl, key };
  }

  function searchUsers(currentUserId, query = '') {
    let url = `/users/search?userId=${encodeURIComponent(currentUserId)}`;
    if (query) url += `&query=${encodeURIComponent(query)}`;
    return request('GET', url);
  }

  function createConversation(userId, recipientId, senderName, recipientName) {
    return request('POST', '/conversations', { userId, recipientId, senderName, recipientName });
  }

  function getStats() {
    return request('GET', '/stats');
  }

  function syncUser(userId, email, displayName) {
    return request('POST', '/sync-user', { userId, email, displayName });
  }

  return { getChats, getMessages, updateProfile, getUploadUrl, uploadFile, searchUsers, createConversation, getStats, syncUser };
})();

// ============================================
// WebSocket Service
// ============================================
const WsService = (() => {
  let ws = null;
  let userId = null;
  let reconnectTimer = null;
  let reconnectAttempts = 0;
  const MAX_RECONNECT = 5;
  const listeners = {};

  function on(event, fn) {
    if (!listeners[event]) listeners[event] = [];
    listeners[event].push(fn);
  }

  function emit(event, data) {
    (listeners[event] || []).forEach(fn => fn(data));
  }

  function connect(uid) {
    userId = uid;
    if (ws && (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING)) return;

    const url = CONFIG.WEBSOCKET_URL + (CONFIG.WEBSOCKET_URL.includes('?') ? '&' : '?') + `userId=${encodeURIComponent(userId)}`;
    ws = new WebSocket(url);

    ws.onopen = () => {
      console.log('WebSocket connected');
      reconnectAttempts = 0;
      emit('connected');
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.action === 'newMessage') {
          emit('newMessage', data.message);
        } else if (data.action === 'typing') {
          emit('typing', data.typing);
        } else if (data.action === 'messageDeleted') {
          emit('messageDeleted', data.deletion);
        } else if (data.action === 'userStatus') {
          emit('userStatus', data.status);
        } else {
          emit('message', data);
        }
      } catch (e) {
        console.warn('WS parse error:', e);
      }
    };

    ws.onclose = (e) => {
      console.log('WebSocket closed', e.code, e.reason);
      emit('disconnected');
      if (reconnectAttempts < MAX_RECONNECT && userId) {
        const delay = Math.min(1000 * Math.pow(2, reconnectAttempts), 30000);
        reconnectTimer = setTimeout(() => { reconnectAttempts++; connect(userId); }, delay);
      }
    };

    ws.onerror = (e) => {
      console.error('WebSocket error:', e);
    };
  }

  function send(action, payload) {
    if (!ws || ws.readyState !== WebSocket.OPEN) {
      console.warn('WebSocket not connected');
      return false;
    }
    ws.send(JSON.stringify({ action, ...payload }));
    return true;
  }

  function sendMessage(conversationId, senderId, content, recipientId) {
    return send('sendMessage', { conversationId, senderId, content, recipientId });
  }

  function sendTyping(conversationId, senderId, recipientId, isTyping) {
    return send('typing', { conversationId, senderId, recipientId, isTyping });
  }

  function deleteMessage(conversationId, messageId, senderId, recipientId) {
    return send('deleteMessage', { conversationId, messageId, senderId, recipientId });
  }

  function disconnect() {
    userId = null;
    clearTimeout(reconnectTimer);
    if (ws) { ws.close(); ws = null; }
  }

  function isConnected() { return ws && ws.readyState === WebSocket.OPEN; }

  return { connect, disconnect, send, sendMessage, sendTyping, deleteMessage, on, isConnected };
})();
