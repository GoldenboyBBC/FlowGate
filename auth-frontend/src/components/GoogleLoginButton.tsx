import React from 'react';
import { styles } from '../styles/styles';

interface GoogleLoginButtonProps {
  onClick: () => void;
}

export const GoogleLoginButton: React.FC<GoogleLoginButtonProps> = ({ onClick }) => {
  return (
    <button 
      type="button"
      onClick={onClick} 
      style={{...styles.button, ...styles.googleButton}}
    >
      Sign in with Google
    </button>
  );
};
