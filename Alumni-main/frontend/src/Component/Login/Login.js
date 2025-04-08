import React, { useState } from 'react';
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import axios from 'axios';
import './Login.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [activeRole, setActiveRole] = useState('Student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const auth = getAuth();
  const googleProvider = new GoogleAuthProvider();

  const studentEmailRegex = /^\d{4}\.[a-zA-Z]+\.[a-zA-Z]+@ves\.ac\.in$/;

  const handleLogin = async (e) => {
    e.preventDefault();

    if (activeRole === 'Student' && !studentEmailRegex.test(email)) {
      setError('Invalid email format. Use yearofstudy.firstname.lastname@ves.ac.in');
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;

      const response = await axios.get(`http://localhost:5000/api/users/${firebaseUser.email}`);
      const userData = response.data;

      console.log('User data from MongoDB:', userData);

      localStorage.setItem('role', userData.role);
      localStorage.setItem('name', userData.name);
      navigate('/home');
    } catch (err) {
      setError('Login failed. Please check your credentials.');
      console.error(err);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log('Google User logged in:', result.user);
      window.location.href = '/home';
    } catch (err) {
      setError('Error logging in with Google. Please try again.');
      console.error('Error logging in with Google:', err);
    }
  };

  return (
    <div className="loginn">
      <div className="login-container">
        <div className="role-switcher-login">
          {['Student', 'Alumni', 'Organisation'].map((role, index) => (
            <div
              key={role}
              className={`role-option-login ${activeRole === role ? 'active' : ''}`}
              onClick={() => setActiveRole(role)}
            >
              {role}
            </div>
          ))}
          <div className="slider-login" style={{ left: `${['Student', 'Alumni', 'Organisation'].indexOf(activeRole) * 33.33}%` }}></div>
        </div>
        <div className="form-container-login">
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
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-group-login">
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="loginsubmit">Login</button>
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