import { useState, useEffect } from 'react';

export const useAuth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }

    // Handle OAuth2 callback
    const params = new URLSearchParams(window.location.search);
    const callbackToken = params.get('token');
    const username = params.get('username');
    const email = params.get('email');

    if (callbackToken) {
      localStorage.setItem('token', callbackToken);
      localStorage.setItem('username', username || '');
      localStorage.setItem('email', email || '');
      setToken(callbackToken);
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    
    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
    
    try {
      const response = await fetch(`http://localhost:8080${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      
      const data = await response.json();
      setMessage(data.message);
      setIsSuccess(data.success);
      
      if (data.success) {
        if (isLogin) {
          localStorage.setItem('token', data.jwt);
          localStorage.setItem('username', username);
          setToken(data.jwt);
        } else {
          setIsLogin(true);
        }
      }
    } catch (error) {
      setMessage('Cannot connect to the backend server.');
      setIsSuccess(false);
    }
  };

  const handleGoogleLogin = () => {
    // Redirect to Google OAuth2 login endpoint
    window.location.href = 'http://localhost:8080/oauth2/authorization/google';
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    setToken(null);
    setMessage('');
  };

  return {
    isLogin,
    setIsLogin,
    username,
    setUsername,
    password,
    setPassword,
    message,
    setMessage,
    isSuccess,
    token,
    handleSubmit,
    handleGoogleLogin,
    handleLogout,
  };
};
