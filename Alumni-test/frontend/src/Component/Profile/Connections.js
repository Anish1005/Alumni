import React from 'react';
import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {
  MapPin,
  GraduationCap,
  Users,
  MessageCircle,
  BarChart2,
} from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Connections.css';
import {Bar, Pie, Doughnut} from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ArcElement
);

const Connections = () => {

    const [name, setName] = useState('');
    
      useEffect(() => {
        const storedName = localStorage.getItem('email');
        if (storedName) {
          setName(storedName);
        }
      }, []);
  const userData = {
    name: 'Sadneya Samant',
    role: 'Alumni',
    batch: '2020',
    department: 'Computer Science',
    location: 'San Francisco, CA',
    education: 'B.Tech, Computer Science - ABC University',
    bio:
      'Passionate software engineer with experience in AI, cloud computing, and software architecture. ' +
      'Actively engaged in mentoring young professionals, networking with industry experts, and contributing ' +
      'to open-source projects. Enthusiastic about leveraging technology to solve real-world problems.',
    avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
    connections: [
      {
        id: 1,
        name: 'Aditi Sharma',
        role: 'Software Engineer',
        company: 'Google',
        location: 'Seattle, WA',
        mutualConnections: 5,
        avatar: 'https://randomuser.me/api/portraits/women/10.jpg',
      },
      {
        id: 2,
        name: 'Rahul Verma',
        role: 'Data Scientist',
        company: 'Microsoft',
        location: 'New York, NY',
        mutualConnections: 3,
        avatar: 'https://randomuser.me/api/portraits/men/15.jpg',
      },
      {
        id: 3,
        name: 'Sneha Kapoor',
        role: 'Product Manager',
        company: 'Amazon',
        location: 'Los Angeles, CA',
        mutualConnections: 7,
        avatar: 'https://randomuser.me/api/portraits/women/20.jpg',
      },
      {
        id: 4,
        name: 'Vikram Das',
        role: 'AI Researcher',
        company: 'OpenAI',
        location: 'San Francisco, CA',
        mutualConnections: 6,
        avatar: 'https://randomuser.me/api/portraits/men/21.jpg',
      },
      {
        id: 5,
        name: 'Priya Menon',
        role: 'UX Designer',
        company: 'Apple',
        location: 'Austin, TX',
        mutualConnections: 4,
        avatar: 'https://randomuser.me/api/portraits/women/25.jpg',
      },
      {
        id: 6,
        name: 'Manoj Reddy',
        role: 'Cybersecurity Analyst',
        company: 'Cisco',
        location: 'Dallas, TX',
        mutualConnections: 8,
        avatar: 'https://randomuser.me/api/portraits/men/30.jpg',
      },
      {
        id: 7,
        name: 'Ananya Bose',
        role: 'Blockchain Developer',
        company: 'Binance',
        location: 'Singapore',
        mutualConnections: 9,
        avatar: 'https://randomuser.me/api/portraits/women/35.jpg',
      },
    ],
  };

  return (
    <div className="app-container">
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

      {/* Main Content */}
      <div className="main-content">
        {/* Left Navigation Bar */}
        <div className="left-bar">
          <Link to="/profile">
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
        {/* Connections Content (Wrapped) */}
        <div className="connections-content">
          {/* User Info Section */}
          <div className="connections-container">
            <div className="user-info">
              <img
                src={userData.avatar}
                alt={userData.name}
                className="user-avatar"
              />
              <div className="user-details">
                <h2 className="user-name">{userData.name}</h2>
                <p className="user-meta">
                  {userData.role} • {userData.department} • Batch{' '}
                  {userData.batch}
                </p>
                <p className="user-location">
                  <MapPin size={16} /> {userData.location}
                </p>
                <p className="user-education">
                  <GraduationCap size={16} /> {userData.education}
                </p>
                <p className="user-bio">{userData.bio}</p>
              </div>
            </div>
          </div>

          {/* Connections List */}
          <div className="connections-list">
            <h3 className="section-title">Connections</h3>
            {userData.connections.map(connection => (
              <div key={connection.id} className="connection-card">
                <img
                  src={connection.avatar}
                  alt={connection.name}
                  className="connection-avatar"
                />
                <div className="connection-info">
                  <h5 className="connection-name">{connection.name}</h5>
                  <p className="connection-role">
                    {connection.role} at{' '}
                    <span className="connection-company">
                      {connection.company}
                    </span>
                  </p>
                  <p className="connection-location">
                    <MapPin size={14} /> {connection.location}
                  </p>
                </div>
                <p className="mutual-connections">
                  <Users size={16} /> {connection.mutualConnections} mutuals
                </p>
                <button className="btn btn-outline-primary message-btn">
                  <MessageCircle size={16} /> Message
                </button>
              </div>
            ))}
          </div>

          {/* Insights Section */}
          <div className="insights-section">
            <h3 className="section-title">
              <BarChart2 size={24} /> Insights
            </h3>
            <div className="chart-container">
              <div className="chart-card">
                <h4>Events Attended</h4>
                <div className="chart-wrapper large-chart">
                  <Bar
                    data={{
                      labels: [
                        'Karan Singh',
                        'Aditi Sharma',
                        'Rahul Verma',
                        'Sneha Kapoor',
                        'Vikram Das',
                        'Priya Menon',
                      ],
                      datasets: [
                        {
                          label: 'Events Attended',
                          data: [15, 10, 8, 12, 14, 9],
                          backgroundColor: [
                            '#007bff',
                            '#28a745',
                            '#ffc107',
                            '#dc3545',
                            '#17a2b8',
                            '#6610f2',
                          ],
                          borderRadius: 6,
                        },
                      ],
                    }}
                    options={{responsive: true, maintainAspectRatio: false}}
                  />
                </div>
              </div>
              <div className="chart-card">
                <h4>Industry Representation</h4>
                <div className="chart-wrapper large-chart">
                  <Pie
                    data={{
                      labels: [
                        'Tech',
                        'Management',
                        'AI',
                        'Design',
                        'Cybersecurity',
                      ],
                      datasets: [
                        {
                          data: [3, 2, 1, 1, 1],
                          backgroundColor: [
                            '#007bff',
                            '#ffc107',
                            '#28a745',
                            '#dc3545',
                            '#17a2b8',
                          ],
                        },
                      ],
                    }}
                    options={{responsive: true, maintainAspectRatio: false}}
                  />
                </div>
              </div>
              <div className="chart-card">
                <h4>Connections by Location</h4>
                <div className="chart-wrapper large-chart">
                  <Doughnut
                    data={{
                      labels: [
                        'San Francisco',
                        'Seattle',
                        'New York',
                        'Los Angeles',
                        'Austin',
                        'Dallas',
                        'Singapore',
                      ],
                      datasets: [
                        {
                          data: [2, 1, 1, 1, 1, 1, 1],
                          backgroundColor: [
                            '#007bff',
                            '#28a745',
                            '#ffc107',
                            '#dc3545',
                            '#17a2b8',
                            '#6610f2',
                            '#e83e8c',
                          ],
                        },
                      ],
                    }}
                    options={{responsive: true, maintainAspectRatio: false}}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>{' '}
        {/* End of connections-content */}
      </div>
    </div>
  );
};

export default Connections;
