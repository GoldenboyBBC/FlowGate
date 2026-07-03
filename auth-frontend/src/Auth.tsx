import React from 'react';
import { useAuth } from './hooks/useAuth';
import { AuthenticatedView } from './components/AuthenticatedView';
import { LoginForm } from './components/LoginForm';
import { RegisterForm } from './components/RegisterForm';
import { styles } from './styles/styles';

export default function Auth() {
  const {
    isLogin,
    setIsLogin,
    username,
    setUsername,
    password,
    setPassword,
    message,
    isSuccess,
    token,
    handleSubmit,
    handleGoogleLogin,
    handleLogout,
  } = useAuth();

  if (token) {
    const storedUsername = localStorage.getItem('username');
    const storedEmail = localStorage.getItem('email');
    return (
      <AuthenticatedView 
        username={storedUsername}
        email={storedEmail}
        onLogout={handleLogout} 
      />
    );
  }

  return (
    <div style={styles.container}>
      {isLogin ? (
        <LoginForm
          username={username}
          password={password}
          onUsernameChange={setUsername}
          onPasswordChange={setPassword}
          onSubmit={handleSubmit}
          onGoogleLogin={handleGoogleLogin}
          onToggleRegister={() => {
            setIsLogin(false);
          }}
          message={message}
          isSuccess={isSuccess}
        />
      ) : (
        <RegisterForm
          username={username}
          password={password}
          onUsernameChange={setUsername}
          onPasswordChange={setPassword}
          onSubmit={handleSubmit}
          onToggleLogin={() => {
            setIsLogin(true);
          }}
          message={message}
          isSuccess={isSuccess}
        />
      )}
    </div>
  );
}
