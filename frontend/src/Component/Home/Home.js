import React from 'react';
import './Home.css';
import EventList from '../../Admin/AdminComponents/Event/EventList';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import JobBoard from "../JobBoard/JobBoard";

const Home = () => {
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
          {/* Regular post with image */}
          <div className="post-card">
            <div className="post-header">
              <img src="https://randomuser.me/api/portraits/women/5.jpg" alt="Sarah Johnson" className="avatar" />
              <div className="post-author">
                <p className="author-name">Sarah Johnson</p>
                <p className="author-headline">Product Manager at Adobe | Rutgers University '18</p>
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

          {/* Job posting */}
          <div className="job-card">
            <div className="job-header">
              <img src="https://i.pinimg.com/originals/01/ca/da/01cada77a0a7d326d85b7969fe26a728.jpg" alt="Amazon logo" className="company-logo" />
              <div>
                <h3 className="job-title">Software Development Engineer</h3>
                <p className="company-name">Amazon</p>
                <p className="job-location">New York, NY (Hybrid)</p>
              </div>
            </div>
            <div className="job-details">
              <span className="job-posted">Posted 3 days ago</span>
              <span>24 applicants</span>
            </div>
            <div style={{ marginTop: '12px' }}>
              <button className="button-primary">Apply Now</button>
              <button className="button-secondary" style={{ marginLeft: '8px' }}>Save</button>
            </div>
          </div>

          {/* Experience sharing post */}
          <div className="post-card">
            <div className="post-header">
              <img src="https://randomuser.me/api/portraits/men/5.jpg" alt="Michael Chen" className="avatar" />
              <div className="post-author">
                <p className="author-name">Michael Chen</p>
                <p className="author-headline">Data Scientist at Google | University Alum '20</p>
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

          {/* Newsletter */}
          <div className="newsletter-card">
            <div className="newsletter-header">
              <h3 className="newsletter-title">Weekly Alumni Newsletter</h3>
              <span style={{ fontSize: '14px' }}>March 28, 2025</span>
            </div>
            <img src="https://images.pexels.com/photos/3184405/pexels-photo-3184405.jpeg" alt="Newsletter header image" className="newsletter-image" />
            <p className="newsletter-description">This week: Alumni networking event in Boston, 5 new job opportunities from alumni companies, and a spotlight on Professor Johnson's research breakthrough.</p>
            <button className="button-primary">Read the Full Newsletter</button>
          </div>

          {/* Another post with image */}
          <div className="post-card">
            <div className="post-header">
              <img src="https://randomuser.me/api/portraits/women/7.jpg" alt="Dr. Emily Rodriguez" className="avatar" />
              <div className="post-author">
                <p className="author-name">Dr. Emily Rodriguez</p>
                <p className="author-headline">Assistant Professor, Computer Science | PhD '19</p>
                <p className="post-time">Posted yesterday</p>
              </div>
            </div>
            <div className="post-content">
              <p className="post-text">
                Incredibly honored to receive the University Rising Star Faculty Award! Thank you to my amazing students and colleagues for their support. I'm looking forward to continuing our research on ethical AI implementations.<br /><br />
                We're currently recruiting undergraduate research assistants for summer 2025 - please reach out if interested!
              </p>
              <img src="/images/posts/award-ceremony.jpg" alt="Award ceremony" className="post-image" />
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

          {/* People you may know */}
          <div className="connections-card">
            <h3 className="connections-header">Alumni You May Know</h3>
            <div className="connection-item">
              <img src="https://randomuser.me/api/portraits/women/12.jpg" alt="Priya Patel" className="avatar" />
              <div className="connection-details">
                <p className="connection-name">Priya Patel</p>
                <p className="connection-headline">Senior Marketing Manager at Spotify | Class of '17</p>
              </div>
              <button className="button-secondary">Connect</button>
            </div>
            <div className="connection-item">
              <img src="https://randomuser.me/api/portraits/men/7.jpg" alt="James Wilson" className="avatar" />
              <div className="connection-details">
                <p className="connection-name">James Wilson</p>
                <p className="connection-headline">Frontend Developer at Microsoft | Class of '21</p>
              </div>
              <button className="button-secondary">Connect</button>
            </div>
            <div className="connection-item">
              <img src="https://randomuser.me/api/portraits/women/9.jpg" alt="Sophia Chang" className="avatar" />
              <div className="connection-details">
                <p className="connection-name">Sophia Chang</p>
                <p className="connection-headline">Product Designer at Meta | Class of '19</p>
              </div>
              <button className="button-secondary">Connect</button>
            </div>
          </div>

          {/* Another job posting */}
          <div className="job-card">
            <div className="job-header">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2OsbzLTVfT-Zls_gsRe7WVDz7a603fVsTqw&s" alt="Deloitte logo" className="company-logo" />
              <div>
                <h3 className="job-title">Business Analyst, Entry Level</h3>
                <p className="company-name">Deloitte</p>
                <p className="job-location">Boston, MA (On-site)</p>
              </div>
            </div>
            <div className="job-details">
              <span className="job-posted">Posted 1 day ago</span>
              <span>8 applicants</span>
            </div>
            <div style={{ marginTop: '12px' }}>
              <button className="button-primary">Apply Now</button>
              <button className="button-secondary" style={{ marginLeft: '8px' }}>Save</button>
            </div>
          </div>

          {/* Event announcement post */}
          <div className="post-card">
            <div className="post-header">
              <img src="https://media.licdn.com/dms/image/v2/C510BAQFWe4plZd5Nfw/company-logo_200_200/company-logo_200_200/0/1630566553019?e=2147483647&v=beta&t=BPEg8OhiKkDBLJdBUfPAdE7m5YkmzYC9VNgP5aUqjnY" alt="Alumni Association" className="avatar" />
              <div className="post-author">
                <p className="author-name">University Alumni Association</p>
                <p className="author-headline">Official University Organization</p>
                <p className="post-time">Posted 3d ago</p>
              </div>
            </div>
            <div className="post-content">
              <p className="post-text">
                🎓 <strong>Annual Alumni Weekend - Save the Date!</strong> 🎓<br /><br />
                Mark your calendars for June 12-14, 2025! We're thrilled to announce our biggest alumni gathering of the year. Events include department reunions, campus tours, professional networking sessions, and our signature gala dinner.<br /><br />
                Early bird registration opens April 15. Stay tuned for more details!
              </p>
              <img src="/images/posts/alumni-weekend.jpg" alt="Alumni weekend" className="post-image" />
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

export default Home;
