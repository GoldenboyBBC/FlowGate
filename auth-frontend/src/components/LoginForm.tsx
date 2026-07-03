
import React from 'react';
import { styles } from '../styles/styles';
import { GoogleLoginButton } from './GoogleLoginButton';

interface LoginFormProps {
  onUsernameChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onGoogleLogin: () => void;
  onToggleRegister: () => void;
  username: string;
  password: string;
  message: string;
  isSuccess: boolean;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  onUsernameChange,
  onPasswordChange,
  onSubmit,
  onGoogleLogin,
  onToggleRegister,
  username,
  password,
  message,
  isSuccess,
}) => {
  return (
    <form onSubmit={onSubmit} style={styles.form}>
      <h2 style={styles.title}>Sign In</h2>
      
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => onUsernameChange(e.target.value)}
        style={styles.input}
        required
      />
      
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => onPasswordChange(e.target.value)}
        style={styles.input}
        required
      />
      
      <button type="submit" style={styles.button}>
        Login
      </button>

      <div style={styles.divider}>
        <span>OR</span>
      </div>

      <GoogleLoginButton onClick={onGoogleLogin} />

      {message && (
        <p style={{ ...styles.message, color: isSuccess ? '#4caf50' : '#f44336' }}>
          {message}
        </p>
      )}

      <p style={styles.toggleText}>
        Don't have an account?{' '}
        <span 
          onClick={onToggleRegister} 
          style={styles.link}
        >
          Register here
        </span>
      </p>
    </form>
  );
};
