import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import EventList from '../../Admin/AdminComponents/Event/EventList';
import './ApplyForm.css'; // We'll keep the existing CSS for other components

const ApplyForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', resume: '' });
  const [name, setName] = useState('');
  const [showForm, setShowForm] = useState(true);
  const navigate = useNavigate();

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log('Application submitted:', formData);
    alert('Application submitted successfully!');
    // Navigate back to the job board page after submission
    navigate('/job-board');
  };

  const handleClose = () => {
    // Navigate back to the job board page on cancel
    navigate('/job-board');
  };

  useEffect(() => {
    const storedName = localStorage.getItem('email');
    if (storedName) {
      setName(storedName);
    }
  }, []);

  return (
    <div className="home-container">
      {/* Top Bar */}
      <div className="top-bar">
        <span
          className="app-name"
          onClick={() => navigate('/home')}
          style={{ cursor: 'pointer' }}
        >
          VESIT Link
        </span>
        <input type="text" placeholder="Search..." className="search-bar" />
        <div className="user-profile">
          <Link to={`/profile/${name}`} className="user-profile-link">
            <img
              src="https://randomuser.me/api/portraits/men/4.jpg"
              alt="User"
              className="profile-pic"
            />
            <span style={{ fontSize: '17px', fontWeight: 'bold' }}>
              {name ? name : 'User'}!
            </span>
          </Link>
        </div>
      </div>

      {/* Main Content with Three Columns */}
      <div className="main-content">
        {/* Left Navigation Bar */}
        <div className="left-bar">
          <Link to={`/profile/${name}`}>
            <button>Profile</button>
          </Link>
          <Link to="/people" className="find-people">
            <button>Find People!</button>
          </Link>
          <Link to="/messages">
            <button>Messages</button>
          </Link>
          <Link to="/job-board">
            <button>Job Board</button>
          </Link>
          <Link to="/newsletter">
            <button>Newsletters</button>
          </Link>
          <Link to="/video_call">
            <button>Video Call</button>
          </Link>
          <Link to="/Fund-Raising">
            <button>Raise Funds</button>
          </Link>
          <Link to="/forum" className="big-forum-button">
            <button>🚀 Connect with Seniors!</button>
          </Link>
        </div>

        {/* Center Column for Internships - Redesigned */}
        <div className="center-bar-2">
          {showForm && (
            <div className="form-overlay">
              <div className="application-form-container">
                <div className="form-header">
                  <h2>Job Application</h2>
                  <p>Please fill in your details to apply</p>
                </div>
                
                <form onSubmit={handleSubmit} className="application-form">
                  <div className="form-field">
                    <label htmlFor="name">Full Name</label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="form-field">
                    <label htmlFor="email">Email Address</label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="form-field">
                    <label htmlFor="resume">Resume Link</label>
                    <input
                      id="resume"
                      type="text"
                      name="resume"
                      value={formData.resume}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="form-actions">
                    <button type="button" className="cancel-button" onClick={handleClose}>
                      Cancel
                    </button>
                    <button type="submit" className="submit-button">
                      Submit Application
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>

        {/* Right Column for Peer Discovery and Events */}
        <div className="right-bar">
          <div className="discover-peers">
            <h2>Discover Your Peers</h2>
            <ul>
              <li>
                <div className="peer-card">
                  <img
                    className="peer-pic"
                    src="https://randomuser.me/api/portraits/men/1.jpg"
                    alt="Alice Johnson"
                  />
                  <div className="peer-info">
                    <h3>Alice Johnson</h3>
                    <p>
                      Frontend Developer at XYZ Inc. Passionate about design and
                      usability.
                    </p>
                  </div>
                  <button>+Follow</button>
                </div>
              </li>
              <li>
                <div className="peer-card">
                  <img
                    className="peer-pic"
                    src="https://randomuser.me/api/portraits/women/2.jpg"
                    alt="Michael Smith"
                  />
                  <div className="peer-info">
                    <h3>Michael Smith</h3>
                    <p>
                      Data Scientist. Enthusiast for machine learning and
                      analytics.
                    </p>
                  </div>
                  <button>+Follow</button>
                </div>
              </li>
              <li>
                <div className="peer-card">
                  <img
                    className="peer-pic"
                    src="https://randomuser.me/api/portraits/women/3.jpg"
                    alt="Emma Wilson"
                  />
                  <div className="peer-info">
                    <h3>Emma Wilson</h3>
                    <p>
                      UI/UX Designer. Always learning new trends and improving
                      designs.
                    </p>
                  </div>
                  <button>+Follow</button>
                </div>
              </li>
            </ul>
          </div>
          <div className="upcoming-events">
            <h2>Upcoming Events</h2>
            <EventList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplyForm;