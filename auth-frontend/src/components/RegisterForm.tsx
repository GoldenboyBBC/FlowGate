import React from 'react';
import { styles } from '../styles/styles';

interface RegisterFormProps {
  onUsernameChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onToggleLogin: () => void;
  username: string;
  password: string;
  message: string;
  isSuccess: boolean;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({
  onUsernameChange,
  onPasswordChange,
  onSubmit,
  onToggleLogin,
  username,
  password,
  message,
  isSuccess,
}) => {
  return (
    <form onSubmit={onSubmit} style={styles.form}>
      <h2 style={styles.title}>Sign Up</h2>
      
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
        Register
      </button>

      {message && (
        <p style={{ ...styles.message, color: isSuccess ? '#4caf50' : '#f44336' }}>
          {message}
        </p>
      )}

      <p style={styles.toggleText}>
        Already have an account?{' '}
        <span 
          onClick={onToggleLogin} 
          style={styles.link}
        >
          Login here
        </span>
      </p>
    </form>
  );
};
