import React, { useState, useEffect } from 'react';

export default function Auth() {
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

  if (token) {
    const storedUsername = localStorage.getItem('username');
    const storedEmail = localStorage.getItem('email');
    return (
      <div style={styles.container}>
        <div style={styles.form}>
          <h2 style={styles.title}>Welcome</h2>
          <p style={styles.message}>You are logged in as <strong>{storedUsername || storedEmail}</strong></p>
          {storedEmail && <p style={styles.message}>Email: {storedEmail}</p>}
          <button onClick={handleLogout} style={styles.button}>
            Logout
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.title}>{isLogin ? 'Sign In' : 'Sign Up'}</h2>
        
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
          required
        />
        
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
          required
        />
        
        <button type="submit" style={styles.button}>
          {isLogin ? 'Login' : 'Register'}
        </button>

        <div style={styles.divider}>
          <span>OR</span>
        </div>

        <button 
          type="button"
          onClick={handleGoogleLogin} 
          style={{...styles.button, ...styles.googleButton}}
        >
          Sign in with Google
        </button>

        {message && (
          <p style={{ ...styles.message, color: isSuccess ? '#4caf50' : '#f44336' }}>
            {message}
          </p>
        )}

        <p style={styles.toggleText}>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <span 
            onClick={() => { setIsLogin(!isLogin); setMessage(''); }} 
            style={styles.link}
          >
            {isLogin ? 'Register here' : 'Login here'}
          </span>
        </p>
      </form>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#121212',
    color: '#e0e0e0',
    fontFamily: 'sans-serif',
  },
  form: {
    display: 'flex',
    flexDirection: 'column' as const,
    backgroundColor: '#1e1e1e',
    padding: '40px',
    borderRadius: '6px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
    width: '320px',
    border: '1px solid #2d2d2d',
  },
  title: {
    textAlign: 'center' as const,
    marginBottom: '24px',
    fontWeight: 500,
    letterSpacing: '0.5px',
  },
  input: {
    padding: '12px',
    marginBottom: '16px',
    borderRadius: '4px',
    border: '1px solid #333',
    backgroundColor: '#252525',
    color: '#fff',
    fontSize: '14px',
    outline: 'none',
  },
  button: {
    padding: '12px',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#3a3a3a',
    color: '#fff',
    cursor: 'pointer',
    fontWeight: 'bold' as const,
    fontSize: '14px',
    transition: 'background 0.2s',
    marginBottom: '12px',
  },
  divider: {
    position: 'relative' as const,
    textAlign: 'center' as const,
    margin: '16px 0',
    fontSize: '13px',
    color: '#666',
  },
  googleButton: {
    backgroundColor: '#1f2937',
    border: '1px solid #4b5563',
    marginBottom: '0px',
  },
  message: {
    marginTop: '16px',
    textAlign: 'center' as const,
    fontSize: '14px',
    fontWeight: 500,
  },
  toggleText: {
    marginTop: '20px',
    textAlign: 'center' as const,
    fontSize: '13px',
    color: '#aaaaaa',
  },
  link: {
    color: '#e0e0e0',
    textDecoration: 'underline',
    cursor: 'pointer',
    fontWeight: 500,
  },
};