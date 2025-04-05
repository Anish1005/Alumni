import React from 'react';
import './ApplyForm.css';
import EventList from '../../Admin/AdminComponents/Event/EventList';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const ApplyForm = ({ onClose }) => {
  const [formData, setFormData] = useState({ name: '', email: '', resume: '' });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log('Application submitted:', formData);
    alert('Application submitted successfully!');
    onClose();
  };

  const [name, setName] = useState('');

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
        <span className="app-name">VESIT Link</span>
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
          <Link to={`/profile/${name}`} >
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
          <Link to="/forum" className="big-forum-button">
            <button>🚀 Connect with Seniors!</button>
          </Link>
        </div>

        {/* Center Column for Internships */}
        <div className="center-bar1">
          <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h3 className="text-xl font-semibold mb-4">
                Job Application Form
              </h3>
              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  className="w-full p-2 border rounded"
                  onChange={handleChange}
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  className="w-full p-2 border rounded"
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="resume"
                  placeholder="Resume Link"
                  className="w-full p-2 border rounded"
                  onChange={handleChange}
                  required
                />
                <div className="flex justify-between">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-600 text-white rounded"
                  >
                    Submit
                  </button>
                  <button
                    onClick={onClose}
                    className="px-4 py-2 bg-gray-600 text-white rounded"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
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
              {/* Repeat similar structure for other peers */}
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
