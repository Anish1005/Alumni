import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FundRaising.css';
import EventList from '../../Admin/AdminComponents/Event/EventList';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const CrowdfundingPage = () => {
  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    minimumFund: '',
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/projects'); // your API endpoint
      setProjects(res.data);
    } catch (err) {
      console.error('Failed to fetch projects', err);
    }
  };

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/projects', formData); // post to backend
      setFormData({ title: '', description: '', minimumFund: '' });
      fetchProjects();
    } catch (err) {
      console.error('Submission failed', err);
    }
  };

  const [name, setName] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const storedName = localStorage.getItem('email');
    if (storedName) {
      setName(storedName);
    }
  }, []);

  return (
    <div className="home-container">
      {/* Top Bar */}
      <div className="main-nav">
        <div className="nav-left">
          <img
            src="https://d30mzt1bxg5llt.cloudfront.net/public/uploads/images/_signatoryLogo/VES-logo.png"
            alt="VESIT Logo"
            className="vesit-logo"
          />
          <span
            className="app-name"
            onClick={() => navigate('/home')}
            style={{ cursor: 'pointer' }}
          >
            VESLINK
          </span>
        </div>

        <div className="nav-center">
          <Link to="/home" className="nav-link">Home</Link>
          <Link to="/people" className="nav-link">Connect</Link>
          <Link to="/job-board" className="nav-link">Jobs</Link>
          <Link to="/newsletter" className="nav-link">News</Link>
          <Link to="/Fund-Raising" className="nav-link">Fundraising</Link>
          <Link to="/messages" className="nav-link">Messages</Link>
          <Link to="/video_call" className="nav-link"> Join Room</Link>
          <Link to="/events" className="nav-link">Events</Link>

        </div>

        <div className="nav-right">
          <input type="text" placeholder="Search..." className="search-bar" />
          <div className="user-profile">
            <Link to={`/profile/${name}`} className="user-profile-link">
              <img
                src="https://randomuser.me/api/portraits/men/4.jpg"
                alt="User"
                className="profile-pic"
              />
              <span className="username">
                {name ? name : 'User'}
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content with Three Columns */}
      <div className="main-content">

        <div className="center-bar1">
          <div className="crowdfunding-container">
            <h1 className="title">🎓 Student Crowdfunding Portal</h1>

            <form className="project-form" onSubmit={handleSubmit}>
              <h2>Submit Your Project</h2>
              <input
                type="text"
                name="title"
                placeholder="Project Title"
                value={formData.title}
                onChange={handleChange}
                required
              />
              <textarea
                name="description"
                placeholder="Project Description"
                value={formData.description}
                onChange={handleChange}
                required
              ></textarea>
              <input
                type="number"
                name="minimumFund"
                placeholder="Minimum Fund Required (₹)"
                value={formData.minimumFund}
                onChange={handleChange}
                required
              />
              <button type="submit">Submit Project</button>
            </form>

            <div className="project-list">
              <h2>📢 Active Fundraising Projects</h2>
              {projects.length === 0 ? (
                <p>No projects yet.</p>
              ) : (
                projects.map((project, index) => (
                  <div key={index} className="project-card">
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <p>
                      <strong>💰 Minimum Fund:</strong> ₹{project.minimumFund}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Right Column for Peer Discovery and Events */}
        <div className="right-bar">
          <div className="right-card alumni-spotlight">
            <h3 className="card-title">Alumni Spotlight</h3>
            <div className="spotlight-content">
              <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Featured Alumni" className="spotlight-image" />
              <div className="spotlight-info">
                <h4>Raj Patel</h4>
                <p>CTO at TechFusion</p>
                <p>VESIT Class of 2015</p>
                <a href="#" className="spotlight-link">Read his success story</a>
              </div>
            </div>
          </div>

          <div className="right-card discover-peers">
            <h3 className="card-title">Connect with Alumni</h3>
            <ul className="peer-list">
              <li className="peer-item">
                <div className="peer-card">
                  <img
                    className="peer-pic"
                    src="https://randomuser.me/api/portraits/men/1.jpg"
                    alt="Alice Johnson"
                  />
                  <div className="peer-info">
                    <h4>Alice Johnson</h4>
                    <p>Frontend Developer at XYZ Inc.</p>
                  </div>
                  <button className="connect-button">Connect</button>
                </div>
              </li>
              <li className="peer-item">
                <div className="peer-card">
                  <img
                    className="peer-pic"
                    src="https://randomuser.me/api/portraits/women/2.jpg"
                    alt="Michael Smith"
                  />
                  <div className="peer-info">
                    <h4>Michael Smith</h4>
                    <p>Data Scientist at Analytics Co.</p>
                  </div>
                  <button className="connect-button">Connect</button>
                </div>
              </li>
              <li className="peer-item">
                <div className="peer-card">
                  <img
                    className="peer-pic"
                    src="https://randomuser.me/api/portraits/women/3.jpg"
                    alt="Emma Wilson"
                  />
                  <div className="peer-info">
                    <h4>Emma Wilson</h4>
                    <p>UI/UX Designer at DesignHub</p>
                  </div>
                  <button className="connect-button">Connect</button>
                </div>
              </li>
            </ul>
          </div>

          <div className="right-card upcoming-events">
            <h3 className="card-title">Upcoming Events</h3>
            <EventList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrowdfundingPage;
