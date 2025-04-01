import React from 'react';
import ApplyForm from './ApplyForm';

import EventList from '../../Admin/AdminComponents/Event/EventList';
import {Link,useNavigate} from 'react-router-dom';
import {useEffect, useState,} from 'react';

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
            <span style={{fontSize: '17px', fontWeight: 'bold'}}>
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
            <button>🚀 Connect with Seniors & Ask Your Queries!</button>
          </Link>
        </div>

        {/* Center Column for Internships */}
        <div className="center-bar1">
          <div className="p-6 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Job Board</h2>
            <div className="space-y-4">
              {jobs.map(job => (
                <div key={job.id} className="p-4 border rounded-lg shadow">
                  <h3 className="text-lg font-semibold">{job.title}</h3>
                  <p className="text-gray-600">
                    {job.company} - {job.location}
                  </p>
                  <p className="text-sm text-gray-500">{job.type}</p>
                  <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700" onClick={() => navigate(`/apply`)}>Apply</button> 
                  {/* <button
                    onClick={() => setSelectedJob(job)}
                    className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Apply
                  </button> */}
                </div>
              ))}
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

export default JobBoard;
