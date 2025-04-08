import React from 'react';
import './Home.css';
import EventList from '../../Admin/AdminComponents/Event/EventList';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import JobBoard from "../JobBoard/JobBoard";
import { useNavigate } from 'react-router-dom';

const Home = () => {
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
      {/* Top Navigation Bar */}
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

        {/* Center Column for Feed */}
        <div className="center-bar">
          {/* Create Post Box */}
          <div className="create-post-card">
            <div className="create-post-header">
              <img src="https://randomuser.me/api/portraits/men/4.jpg" alt="User" className="small-avatar" />
              <input type="text" placeholder="Share something with your network..." className="post-input" />
            </div>
            <div className="create-post-actions">
              <button className="post-action-button">
                <svg className="action-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <circle cx="8.5" cy="8.5" r="1.5"></circle>
                  <polyline points="21 15 16 10 5 21"></polyline>
                </svg>
                Photo
              </button>
              <button className="post-action-button">
                <svg className="action-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="23 7 16 12 23 17 23 7"></polygon>
                  <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
                </svg>
                Video
              </button>
              <button className="post-action-button">
                <svg className="action-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                Event
              </button>
              <button className="post-action-button post-button">Post</button>
            </div>
          </div>
          <div className='posts'>
            {/* Regular post with image */}
            <div className="post-card">
              <div className="post-header">
                <img src="https://randomuser.me/api/portraits/women/5.jpg" alt="Sarah Johnson" className="avatar" />
                <div className="post-author">
                  <p className="author-name">Sarah Johnson</p>
                  <p className="author-headline">Product Manager at Adobe | VESIT '18</p>
                  <p className="post-time">Posted 2d ago</p>
                </div>
              </div>
              <div className="post-content">
                <p className="post-text">Excited to share that my team just launched our new product feature that's been 6 months in the making! So proud of everyone who contributed to making this happen. Special thanks to my amazing colleagues who put in countless hours of work.</p>
                <img src="https://www.verywellmind.com/thmb/rfhfJZXVxC8lo_WZ_xC9YTPAUHA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-1342255924-7d9337f5e50a4ae9860de1c5e0dd52ad.jpg" alt="Product launch celebration" className="post-image" />
                <div className="post-actions">
                  <button className="action-button">
                    <svg className="action-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
                    </svg>
                    Like
                  </button>
                  <button className="action-button">
                    <svg className="action-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                    Comment
                  </button>
                  <button className="action-button">
                    <svg className="action-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17 2l4 4-4 4"></path>
                      <path d="M3 11v-1a4 4 0 0 1 4-4h14"></path>
                      <path d="M7 22l-4-4 4-4"></path>
                      <path d="M21 13v1a4 4 0 0 1-4 4H3"></path>
                    </svg>
                    Share
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Job posting */}
          <div className="job-card">
            <div className="job-header">
              <img src="https://i.pinimg.com/originals/01/ca/da/01cada77a0a7d326d85b7969fe26a728.jpg" alt="Amazon logo" className="company-logo" />
              <div>
                <h3 className="job-title">Software Development Engineer</h3>
                <p className="company-name">Amazon</p>
                <p className="job-location">Mumbai, MH (Hybrid)</p>
              </div>
            </div>
            <div className="job-details">
              <span className="job-posted">Posted 3 days ago</span>
              <span>24 applicants</span>
            </div>
            <div className="job-actions">
              <button className="button-primary">Apply Now</button>
              <button className="button-secondary">Save</button>
            </div>
          </div>

          {/* Experience sharing post */}
          <div className="post-card">
            <div className="post-header">
              <img src="https://randomuser.me/api/portraits/men/5.jpg" alt="Michael Chen" className="avatar" />
              <div className="post-author">
                <p className="author-name">Michael Chen</p>
                <p className="author-headline">Data Scientist at Google | VESIT Alum '20</p>
                <p className="post-time">Posted 1w ago</p>
              </div>
            </div>
            <div className="post-content">
              <p className="post-text">
                Reflecting on my journey since graduation 5 years ago. The most important lesson I've learned is to embrace failure as part of the growth process. I applied to 47 jobs before landing my first role at a startup, and that experience shaped everything that followed. To all current students and recent grads: keep persisting! <br /><br />
                Happy to connect with any students interested in data science or tech careers - just drop me a message.
              </p>
              <div className="post-actions">
                <button className="action-button">
                  <svg className="action-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
                  </svg>
                  Like
                </button>
                <button className="action-button">
                  <svg className="action-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                  </svg>
                  Comment
                </button>
                <button className="action-button">
                  <svg className="action-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 2l4 4-4 4"></path>
                    <path d="M3 11v-1a4 4 0 0 1 4-4h14"></path>
                    <path d="M7 22l-4-4 4-4"></path>
                    <path d="M21 13v1a4 4 0 0 1-4 4H3"></path>
                  </svg>
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column for Recommendations and Events */}
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

export default Home;