import React, { useState } from 'react';
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import axios from 'axios';
import './Login.css';

const Login = () => {
  const [activeRole, setActiveRole] = useState('Student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const auth = getAuth();
  const googleProvider = new GoogleAuthProvider();

  const handleLogin = async e => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const firebaseUser = userCredential.user;

      // Fetch user role and data from MongoDB
      const response = await axios.get(
        `http://localhost:5000/api/users/${firebaseUser.email}`
      );
      const userData = response.data;

      console.log('User data from MongoDB:', userData);

      // Save role or other user data in localStorage if needed
      localStorage.setItem('role', userData.role);
      window.location.href = '/home';
    } catch (err) {
      setError('Login failed. Please check your credentials.');
      console.error(err);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log('Google User logged in:', result.user);
      window.location.href = '/home'; // Redirect to the home page
    } catch (err) {
      setError('Error logging in with Google. Please try again.');
      console.error('Error logging in with Google:', err);
    }
  };

  return (
    <div className="loginn">
      <div className="login-container">
        <div className="role-switcher">
          <div
            className={`role-option ${activeRole === 'Student' ? 'active' : ''}`}
            onClick={() => setActiveRole('Student')}
          >
            Student
          </div>
          <div
            className={`role-option ${activeRole === 'Alumni' ? 'active' : ''}`}
            onClick={() => setActiveRole('Alumni')}
          >
            Alumni
          </div>
          <div
            className={`role-option ${activeRole === 'Organisation' ? 'active' : ''}`}
            onClick={() => setActiveRole('Organisation')}
          >
            Organisation
          </div>
          <div
            className="slider"
            style={{
              left: activeRole === 'Student' ? '0%' : activeRole === 'Alumni' ? '33.33%' : '66.66%',
            }}
          ></div>
        </div>
        <div className="form-container">
          <h2>{activeRole} Login</h2>
          {error && <p className="error">{error}</p>}
          <form onSubmit={handleLogin}>
            <div className="input-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className='loginsubmit'>Login</button>
          </form>
          <div className="alternate-action">
            <p>
              Not a member? <a href="/signup">Sign up</a>
            </p>
          </div>
          <hr />
          <b>OR</b>
          <button className="google-login-button" onClick={handleGoogleLogin}>
            <img
              src="https://cdn-icons-png.flaticon.com/128/300/300221.png"
              alt="Google logo"
              className="google-logo"
            />
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
