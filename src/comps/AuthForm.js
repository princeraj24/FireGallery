import React, { useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import { projectAuth } from '../firebase/config';
import { motion } from 'framer-motion';

const AuthForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isSignup, setIsSignup] = useState(false);
  const [error, setError] = useState('');

  const handleAuth = async (e) => {
    e.preventDefault();
    setError('');

    try {
      if (isSignup) {
        await projectAuth.createUserWithEmailAndPassword(email, password);
      } else {
        await projectAuth.signInWithEmailAndPassword(email, password);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');

    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      await projectAuth.signInWithPopup(provider);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-page">
      <motion.div
        className="auth-showcase"
        initial={{ opacity: 0, x: -35 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
      >
        <div className="mini-brand">
          <span>F</span>
          FireGallery
        </div>

        <h1>
          Build your private <span>visual world.</span>
        </h1>
        <p>
          A calm, aesthetic image gallery where every user gets their own personal photo space.
        </p>
      </motion.div>

      <motion.div
        className="auth-form"
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <p className="eyebrow">WELCOME TO FIREGALLERY</p>
        <h2>{isSignup ? 'Create Account' : 'Login'}</h2>
        <p className="auth-subtitle">
          {isSignup
            ? 'Create your account and start uploading your favorite pictures.'
            : 'Login to access your personal photo collection.'}
        </p>

        <button type="button" className="google-btn" onClick={handleGoogleLogin}>
          Continue with Google
        </button>

        <div className="divider">
          <span></span>
          <p>or use email</p>
          <span></span>
        </div>

        <form onSubmit={handleAuth} className="login-form">
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className="auth-btn">
            {isSignup ? 'Sign Up' : 'Login'}
          </button>

          {error && <p className="error">{error}</p>}
        </form>

        <p onClick={() => setIsSignup(!isSignup)} className="auth-switch">
          {isSignup
            ? 'Already have an account? Login'
            : "Don't have an account? Sign up"}
        </p>
      </motion.div>
    </div>
  );
};

export default AuthForm;