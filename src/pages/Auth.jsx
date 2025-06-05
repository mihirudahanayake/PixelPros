import React, { useState } from 'react';
import { auth, provider }  from '../firebase/firebaseConfig/';

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  sendPasswordResetEmail,
  sendEmailVerification,
} from 'firebase/auth';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      const result = isLogin
        ? await signInWithEmailAndPassword(auth, email, password)
        : await createUserWithEmailAndPassword(auth, email, password);

      if (!isLogin) {
        await sendEmailVerification(result.user);
        setError("✅ Signup successful! Please verify your email before logging in.");
        setUser(null); // prevent login until email is verified
        return;
      }

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
    <div className="max-w-md mx-auto bg-white p-6 mt-8 shadow-md rounded-lg">
      {user ? (
        <div className="text-center">
          <p className="mb-4">👋 Welcome, {user.displayName || user.email}</p>
          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      ) : (
        <>
          <h2 className="text-xl font-bold mb-4 text-center">{isLogin ? 'Login' : 'Sign Up'}</h2>
          <form onSubmit={handleAuth} className="flex flex-col space-y-4">
            <input
              type="email"
              placeholder="Email"
              required
              className="border px-3 py-2 rounded"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              required
              className="border px-3 py-2 rounded"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
              {isLogin ? 'Login' : 'Sign Up'}
            </button>
            {isLogin && (
              <button
                type="button"
                onClick={handleResetPassword}
                className="text-blue-500 text-sm text-right hover:underline"
              >
                Forgot Password?
              </button>
            )}
          </form>
          <button
            onClick={handleGoogle}
            className="mt-4 w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
          >
            Sign in with Google
          </button>
          {error && <p className="text-red-600 mt-2 text-sm text-center">{error}</p>}
          <p className="text-center mt-4 text-sm">
            {isLogin ? 'No account?' : 'Already have an account?'}{' '}
            <button className="text-blue-600" onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? 'Sign up' : 'Login'}
            </button>
          </p>
        </>
      )}
    </div>
  );
};

export default Auth;
