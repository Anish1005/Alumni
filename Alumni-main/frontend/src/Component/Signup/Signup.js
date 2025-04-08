import React, { useState } from 'react';
import { provider } from '../../firebase';
import { signInWithPopup, getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import axios from 'axios';
import Swal from 'sweetalert2';
import './Signup.css';

const Signup = () => {
  const [role, setRole] = useState('Student');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [organizationName, setOrganizationName] = useState(''); // New state for organization name
  const [error, setError] = useState('');
  const auth = getAuth();

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const newUser = {
        name: user.displayName,
        email: user.email,
        role: role,
        organizationName: organizationName, // Include organization name if role is Organization
      };

      const response = await axios.post('http://localhost:5000/api/users', newUser);
      Swal.fire('Success!', 'You have successfully signed up!', 'success');
      window.location.href = '/home';
    } catch (err) {
      setError(err.response?.data?.message || 'Error signing in with Google');
    }
  };

  const handleFormSignup = async e => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;

      const newUser = {
        name: name,
        email: firebaseUser.email,
        role: role,
        organizationName: role === 'Organization' ? organizationName : null, // Add organization name if role is Organization
      };

      await axios.post('http://localhost:5000/api/users', newUser);
      Swal.fire('Success!', 'You have successfully signed up!', 'success');
      window.location.href = '/home';
    } catch (err) {
      setError(err.response?.data?.message || 'Error signing up');
    }
  };

  return (
    <div className="signup">
      <div className="signup-container">
        <div className="signup-role-switcher">
          <div
            className={`role-option ${role === 'Student' ? 'active' : ''}`}
            onClick={() => setRole('Student')}
          >
            Student
          </div>
          <div
            className={`role-option ${role === 'Alumni' ? 'active' : ''}`}
            onClick={() => setRole('Alumni')}
          >
            Alumni
          </div>
          <div
            className={`role-option ${role === 'Organization' ? 'active' : ''}`}
            onClick={() => setRole('Organization')}
          >
            Organization
          </div>
          <div className="signup-slider" style={{ left: role === 'Student' ? '0%' : role === 'Alumni' ? '33.33%' : '66.66%' }}></div>
        </div>
        <div className="signup-form-container">
          <h2>{role} Signup</h2>
          {error && <p className="error">{error}</p>}
          <form onSubmit={handleFormSignup}>
            <div className="signup-input-group">
              <label>Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={e => setName(e.target.value)}
                required
              />
            </div>
            <div className="signup-input-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="signup-input-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="signup-input-group">
              <label>Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            {/* Show organization name field if role is Organization */}
            {role === 'Organization' && (
              <div className="signup-input-group">
                <label>Organization Name</label>
                <input
                  type="text"
                  placeholder="Enter organization name"
                  value={organizationName}
                  onChange={e => setOrganizationName(e.target.value)}
                  required
                />
              </div>
            )}

            <button type="submit">Signup</button>
            <div className="signup-alternate-action">
              <p>
                Already a member? <a href="/">Log in</a>
              </p>
            </div>
          </form>
        </div>
        <hr />
        <button className="signup-google-login-button" onClick={handleGoogleSignIn}>
          <img
            src="https://cdn-icons-png.flaticon.com/128/300/300221.png"
            alt="Google logo"
            className="google-logo"
          />
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Signup;
