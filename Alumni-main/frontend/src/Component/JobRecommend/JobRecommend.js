import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./JobRecommend.css";
import { Link, useNavigate } from 'react-router-dom';
import EventList from '../../Admin/AdminComponents/Event/EventList';

const jobDatabase = {
  'Software Developer': [
    {
      id: 1,
      title: 'Frontend Developer',
      company: 'Tech Corp',
      location: 'Remote',
      type: 'Full-time',
    },
    {
      id: 2,
      title: 'Backend Developer',
      company: 'CodeBase Inc.',
      location: 'Bangalore',
      type: 'Full-time',
    },
    {
      id: 3,
      title: 'Full Stack Developer',
      company: 'StackMasters',
      location: 'Mumbai',
      type: 'Hybrid',
    },
    {
      id: 4,
      title: 'Mobile App Developer',
      company: 'Appverse',
      location: 'Chennai',
      type: 'Full-time',
    },
    {
      id: 5,
      title: 'Software Engineer Intern',
      company: 'StartupNest',
      location: 'Remote',
      type: 'Internship',
    },
  ],
  'Data Analyst': [
    {
      id: 6,
      title: 'Junior Data Analyst',
      company: 'DataWorld',
      location: 'New York',
      type: 'Internship',
    },
    {
      id: 7,
      title: 'Business Data Analyst',
      company: 'FinanceMetrics',
      location: 'Mumbai',
      type: 'Full-time',
    },
    {
      id: 8,
      title: 'SQL Data Analyst',
      company: 'HealthData Inc.',
      location: 'Pune',
      type: 'Full-time',
    },
    {
      id: 9,
      title: 'Data Visualization Specialist',
      company: 'GraphIQ',
      location: 'Remote',
      type: 'Full-time',
    },
    {
      id: 10,
      title: 'Data Analytics Intern',
      company: 'EduTech Insights',
      location: 'Delhi',
      type: 'Internship',
    },
  ],
  'Product Manager': [
    {
      id: 11,
      title: 'Associate Product Manager',
      company: 'InnovateX',
      location: 'Remote',
      type: 'Full-time',
    },
    {
      id: 12,
      title: 'Product Lead',
      company: 'VisionTech',
      location: 'San Francisco',
      type: 'Full-time',
    },
    {
      id: 13,
      title: 'Technical Product Manager',
      company: 'DevTools Hub',
      location: 'Bangalore',
      type: 'Full-time',
    },
    {
      id: 14,
      title: 'Product Manager Intern',
      company: 'StartSprint',
      location: 'Remote',
      type: 'Internship',
    },
    {
      id: 15,
      title: 'Senior Product Strategist',
      company: 'MarketMinds',
      location: 'Gurgaon',
      type: 'Full-time',
    },
  ],
  'Cybersecurity Analyst': [
    {
      id: 16,
      title: 'SOC Analyst',
      company: 'SecureTech',
      location: 'Washington, D.C.',
      type: 'Full-time',
    },
    {
      id: 17,
      title: 'Security Engineer',
      company: 'CyberDefend',
      location: 'Pune',
      type: 'Full-time',
    },
    {
      id: 18,
      title: 'Penetration Tester',
      company: 'Ethical Hackers Ltd.',
      location: 'Hyderabad',
      type: 'Full-time',
    },
    {
      id: 19,
      title: 'Cybersecurity Intern',
      company: 'SafeWeb',
      location: 'Remote',
      type: 'Internship',
    },
    {
      id: 20,
      title: 'Network Security Specialist',
      company: 'FireWallers',
      location: 'Chennai',
      type: 'Full-time',
    },
  ],
};

function JobRecommenderFromProfile() {
  const [email] = useState(localStorage.getItem('email') || '');
  const [recommendation, setRecommendation] = useState('');
  const [jobList, setJobList] = useState([]);

  const [name, setName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedName = localStorage.getItem('email');
    if (storedName) {
      setName(storedName);
    }
  }, []);

  useEffect(() => {
    if (email) {
      axios
        .get(`http://localhost:8080/recommend-by-email/${email}`)
        .then(res => {
          const recommendedJob = res.data.recommended_job;
          setRecommendation(recommendedJob);

          // Fetch relevant job list
          if (jobDatabase[recommendedJob]) {
            setJobList(jobDatabase[recommendedJob]);
          } else {
            setJobList([]);
          }
        })
        .catch(err => console.error('Error fetching recommendation:', err));
    }
  }, [email]);

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
        <div className="center-bar-jr">
          <h2 className="section-header">Recommended Jobs For You</h2>
          <div className="section-content">
            {recommendation ? (
              <>
                <h3 className="job-category">{recommendation}</h3>
                <ul className="job-list">
                  {jobList.length > 0 ? (
                    jobList.map(job => (
                      <li key={job.id} className="job-card">
                        <div className="job-info">
                          <h4 className="job-title">{job.title}</h4>
                          <p className="job-company">{job.company}</p>
                          <div className="job-meta">
                            <span>{job.location}</span>
                            <span className="separator">•</span>
                            <span>{job.type}</span>
                          </div>
                        </div>
                        <button className="apply-button"
                          onClick={() => navigate(`/apply`)}>Apply Now</button>
                      </li>
                    ))
                  ) : (
                    <p>No jobs currently available for this role.</p>
                  )}
                </ul>
              </>
            ) : (
              <p>Loading your personalized job recommendations...</p>
            )}
          </div>
        </div>

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

      {/* Add CSS styling */}
      <style jsx>{`
        .home-container {
          font-family: 'Segoe UI', Arial, sans-serif;
          color: #333;
          background-color: #f3f2ef;
          min-height: 100vh;
          margin: 0;
          padding: 0;
        }
        
        
        .center-bar-jr {
          background-color: white;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
          width:900px;
          margin-top:70px;
          padding:30px;
          overflow:auto;
        }
        
        .section-header {
          padding: 16px 20px;
          border-bottom: 1px solid #eee;
          margin: 0;
          font-size: 18px;
          font-weight: 600;
        }
        
        .section-content {
          padding: 20px;
        }
        
        .job-category {
          font-size: 20px;
          color: #0a66c2;
          margin: 0 0 16px 0;
        }
        
        .job-list {
          list-style-type: none;
          padding: 0;
          margin: 0;
        }
        
        .job-card {
          border: 1px solid #eee;
          border-radius: 8px;
          padding: 16px;
          margin-bottom: 12px;
          transition: all 0.2s;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .job-card:hover {
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        
        .job-info {
          flex: 1;
        }
        
        .job-title {
          font-size: 16px;
          font-weight: 600;
          color: #0a66c2;
          margin: 0 0 4px 0;
        }
        
        .job-company {
          font-size: 14px;
          font-weight: 500;
          margin: 0;
        }
        
        .job-meta {
          font-size: 13px;
          color: #666;
          display: flex;
          align-items: center;
          gap: 8px;
          margin: 8px 0 0 0;
        }
        
        .separator {
          color: #ccc;
        }
        
        .apply-button {
          background-color: #0a66c2;
          color: white;
          border: none;
          border-radius: 16px;
          padding: 6px 16px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.2s;
          white-space: nowrap;
        }
        
        .apply-button:hover {
          background-color: #084e96;
        }
        

      `}</style>
    </div>
  );
}

export default JobRecommenderFromProfile;