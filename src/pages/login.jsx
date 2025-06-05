import React, { useState } from 'react';
import { auth, provider }  from '../firebase/firebaseConfig';

import {
  signInWithEmailAndPassword,
  signInWithPopup,
  sendPasswordResetEmail,
  sendEmailVerification,
  signOut,
} from 'firebase/auth';
import './Pages.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);

      if (!result.user.emailVerified) {
        await signOut(auth);
        setUser(null);
        setError("⚠️ Please verify your email before logging in.");
        return;
      }

      setUser(result.user);
      setError('');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      if (!result.user.emailVerified) {
        await sendEmailVerification(result.user);
        setError("📧 Verification email sent to your Google account.");
      }
      setUser(result.user);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleResetPassword = async () => {
    if (!email) {
      setError("Please enter your email to reset password.");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      setError("📧 Password reset email sent!");
    } catch (err) {
      setError(err.message);
    }
  };

  const logout = () => {
    signOut(auth);
    setUser(null);
  };

  return (
    <div className="login-container">
      {user ? (
        <div className="text-center">
          <p className="login-message">👋 Welcome, {user.displayName || user.email}</p>
          <button onClick={logout} className="logout-button">Logout</button>
        </div>
      ) : (
        <>
          <h2>Login</h2>
          <form onSubmit={handleLogin} className="login-form">
            <input
              type="email"
              placeholder="Email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className="login-button">Login</button>
            <button type="button" onClick={handleResetPassword} className="reset-link">
              Forgot Password?
            </button>
          </form>
          <button onClick={handleGoogle} className="google-button">Sign in with Google</button>
          {error && <p className="login-message">{error}</p>}
          <p className="login-footer">
            No account? <a href="/signup">Sign up</a>
          </p>
        </>
      )}
    </div>
  );
};

export default Login;
