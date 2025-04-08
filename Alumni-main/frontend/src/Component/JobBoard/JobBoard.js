import React from 'react';
import ApplyForm from './ApplyForm';

import EventList from '../../Admin/AdminComponents/Event/EventList';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import './JobBoard.css';

const jobs = [
  {
    id: 1,
    title: 'Software Engineer',
    company: 'Tech Corp',
    type: 'Full-time',
    location: 'Remote',
  },
  {
    id: 2,
    title: 'Marketing Intern',
    company: 'Startup Inc.',
    type: 'Internship',
    location: 'New York',
  },
  {
    id: 3,
    title: 'Data Analyst',
    company: 'DataWorks',
    type: 'Full-time',
    location: 'San Francisco',
  },
  {
    id: 4,
    title: 'Product Manager',
    company: 'InnovateX',
    type: 'Full-time',
    location: 'Seattle',
  },
  {
    id: 5,
    title: 'Graphic Designer',
    company: 'Creative Studio',
    type: 'Part-time',
    location: 'Los Angeles',
  },
  {
    id: 6,
    title: 'Cybersecurity Analyst',
    company: 'SecureTech',
    type: 'Full-time',
    location: 'Washington, D.C.',
  },
  {
    id: 7,
    title: 'DevOps Engineer',
    company: 'CloudWorks',
    type: 'Full-time',
    location: 'Austin',
  },
  {
    id: 8,
    title: 'HR Coordinator',
    company: 'PeopleFirst',
    type: 'Full-time',
    location: 'Chicago',
  },
  {
    id: 9,
    title: 'Content Writer',
    company: 'MediaHub',
    type: 'Freelance',
    location: 'Remote',
  },
  {
    id: 10,
    title: 'AI Researcher',
    company: 'AI Labs',
    type: 'Full-time',
    location: 'Boston',
  },
  {
    id: 11,
    title: 'Network Engineer',
    company: 'NetSolutions',
    type: 'Full-time',
    location: 'Denver',
  },
  {
    id: 12,
    title: 'Business Analyst',
    company: 'FinancePros',
    type: 'Full-time',
    location: 'New York',
  },
  {
    id: 13,
    title: 'QA Tester',
    company: 'Game Studios',
    type: 'Contract',
    location: 'San Diego',
  },
  {
    id: 14,
    title: 'Customer Support Representative',
    company: 'HelpDesk',
    type: 'Part-time',
    location: 'Remote',
  },
  {
    id: 15,
    title: 'Blockchain Developer',
    company: 'CryptoTech',
    type: 'Full-time',
    location: 'Miami',
  },
];

const JobBoard = () => {
  const [selectedJob, setSelectedJob] = useState(null);
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

        {/* Center Column for Internships */}
        <div className="center-bar-jb">
          <div className="job-board-container">
            <div className="job-board-content">
              <h2 className="job-board-title">Job Board</h2>

              <div className="recommendation-panel">
                <h3 className="recommendation-title">
                  Jobs Suggested Based on Your Profile
                </h3>
                <p className="recommendation-description">
                  Personalized recommendations tailored to your interests and skills.
                </p>
                <button
                  className="recommendation-button"
                  onClick={() => navigate('/Job-Recommend')}
                >
                  Go to Recommended Jobs
                </button>
              </div>

              <div className="job-listings">
                {jobs.map(job => (
                  <div key={job.id} className="job-card">
                    <h3 className="job-title">{job.title}</h3>
                    <p className="job-company">
                      {job.company} - {job.location}
                    </p>
                    <p className="job-type">{job.type}</p>
                    <button
                      className="apply-button"
                      onClick={() => navigate(`/apply`)}
                    >
                      Apply
                    </button>
                  </div>
                ))}
              </div>
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

export default JobBoard;
