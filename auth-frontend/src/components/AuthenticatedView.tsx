import React from 'react';
import { styles } from '../styles/styles';

interface AuthenticatedViewProps {
  username: string | null;
  email: string | null;
  onLogout: () => void;
}

export const AuthenticatedView: React.FC<AuthenticatedViewProps> = ({ username, email, onLogout }) => {
  return (
    <div style={styles.container}>
      <div style={styles.form}>
        <h2 style={styles.title}>Welcome</h2>
        <p style={styles.message}>You are logged in as <strong>{username || email}</strong></p>
        {email && <p style={styles.message}>Email: {email}</p>}
        <button onClick={onLogout} style={styles.button}>
          Logout
        </button>
      </div>
    </div>
  );
};
