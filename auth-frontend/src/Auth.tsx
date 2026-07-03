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

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  if (token) {
    return (
      <div style={styles.container}>
        <div style={styles.form}>
          <h2 style={styles.title}>Welcome</h2>
          <p style={styles.message}>You are logged in.</p>
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