// ============================================
// QuickChat — Cognito Auth Service
// ============================================

const AuthService = (() => {
  let userPool = null;
  let currentUser = null;
  let idToken = null;

  function init() {
    if (typeof AmazonCognitoIdentity === 'undefined') {
      console.warn('Cognito SDK not loaded — running in demo mode');
      return false;
    }
    try {
      const poolData = {
        UserPoolId: CONFIG.COGNITO_USER_POOL_ID,
        ClientId: CONFIG.COGNITO_CLIENT_ID,
      };
      userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
      currentUser = userPool.getCurrentUser();
      return true;
    } catch (e) {
      console.error('Cognito init failed:', e);
      return false;
    }
  }

  function signUp(name, email, phone, password) {
    return new Promise((resolve, reject) => {
      const attributeList = [
        new AmazonCognitoIdentity.CognitoUserAttribute({ Name: 'email', Value: email }),
        new AmazonCognitoIdentity.CognitoUserAttribute({ Name: 'name', Value: name }),
        new AmazonCognitoIdentity.CognitoUserAttribute({ Name: 'phone_number', Value: phone }),
      ];
      // Cognito blocks email-formatted Usernames if the pool uses "email alias".
      // We generate a non-email string for the hidden username, but users will still log in using their email perfectly.
      // The new User pool is configured to require Username to be an email string exactly.
      userPool.signUp(email, password, attributeList, null, (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  }

  function confirmSignUp(email, code) {
    return new Promise((resolve, reject) => {
      const userData = { Username: email, Pool: userPool };
      const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
      cognitoUser.confirmRegistration(code, true, (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  }

  function resendConfirmation(email) {
    return new Promise((resolve, reject) => {
      const userData = { Username: email, Pool: userPool };
      const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
      cognitoUser.resendConfirmationCode((err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  }

  function signIn(email, password) {
    return new Promise((resolve, reject) => {
      const authDetails = new AmazonCognitoIdentity.AuthenticationDetails({
        Username: email,
        Password: password,
      });
      const userData = { Username: email, Pool: userPool };
      const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
      cognitoUser.authenticateUser(authDetails, {
        onSuccess: (session) => {
          currentUser = cognitoUser;
          idToken = session.getIdToken().getJwtToken();
          const payload = session.getIdToken().decodePayload();
          resolve({
            userId: payload.sub,
            email: payload.email,
            displayName: payload.name || payload.email.split('@')[0],
            idToken,
          });
        },
        onFailure: (err) => reject(err),
        newPasswordRequired: () => reject(new Error('New password required — please reset via AWS console.')),
      });
    });
  }

  function restoreSession() {
    return new Promise((resolve, reject) => {
      currentUser = userPool ? userPool.getCurrentUser() : null;
      if (!currentUser) return reject(new Error('No session'));
      currentUser.getSession((err, session) => {
        if (err || !session || !session.isValid()) return reject(err || new Error('Invalid session'));
        idToken = session.getIdToken().getJwtToken();
        const payload = session.getIdToken().decodePayload();
        resolve({
          userId: payload.sub,
          email: payload.email,
          displayName: payload.name || payload.email.split('@')[0],
          idToken,
        });
      });
    });
  }

  function signOut() {
    if (currentUser) {
      try { currentUser.signOut(); } catch (e) { console.warn('signOut error:', e); }
    }
    currentUser = null;
    idToken = null;
    // Clear ALL Cognito tokens from localStorage to prevent stale session restore
    try {
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith('CognitoIdentityServiceProvider')) {
          localStorage.removeItem(key);
        }
      });
    } catch (e) { console.warn('localStorage clear error:', e); }
  }

  function getToken() { return idToken; }

  function forgotPassword(email) {
    return new Promise((resolve, reject) => {
      const userData = { Username: email, Pool: userPool };
      const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
      cognitoUser.forgotPassword({
        onSuccess: (data) => resolve(data),
        onFailure: (err) => reject(err),
      });
    });
  }

  function confirmNewPassword(email, code, newPassword) {
    return new Promise((resolve, reject) => {
      const userData = { Username: email, Pool: userPool };
      const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
      cognitoUser.confirmPassword(code, newPassword, {
        onSuccess: () => resolve(),
        onFailure: (err) => reject(err),
      });
    });
  }

  return { init, signUp, confirmSignUp, resendConfirmation, signIn, restoreSession, signOut, getToken, forgotPassword, confirmNewPassword };
})();
