import React from 'react';
import './NewsletterPage.css';
import EventList from '../../Admin/AdminComponents/Event/EventList';
import {Link, useNavigate} from 'react-router-dom';
import {useEffect, useState} from 'react';

const NewsletterPage = ({ userRole }) => {
  const navigate = useNavigate();
  const [newsletters, setNewsletters] = useState([
    {
      title: 'Alumni Success Stories',
      frequency: 'Weekly',
      description: 'Discover inspiring journeys of alumni who have excelled in their careers, from entrepreneurship to leadership roles. Gain valuable insights and motivation for your own professional growth.',
      image: 'https://images.pexels.com/photos/3184405/pexels-photo-3184405.jpeg',
    },
    {
      title: 'Career Insights & Networking',
      frequency: 'Bi-Weekly',
      description: 'Stay updated with career trends, job opportunities, and industry insights tailored for alumni. Learn about networking events and mentorship opportunities that can help expand your career prospects.',
      image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg',
    },
    {
      title: 'Alumni Events & Reunions',
      frequency: 'Monthly',
      description: 'Join alumni networking events, reunions, and professional meetups. Strengthen connections with old classmates and build new professional relationships.',
      image: 'https://images.pexels.com/photos/3183153/pexels-photo-3183153.jpeg',
    },
  ]);

  // State to store new newsletter input
  const [newNewsletter, setNewNewsletter] = useState({
    title: '',
    frequency: '',
    description: '',
    image: '',
  });

  // Function to handle publishing new newsletter
  const handlePublish = () => {
    if (newNewsletter.title && newNewsletter.frequency && newNewsletter.description && newNewsletter.image) {
      setNewsletters([...newsletters, newNewsletter]);
      setNewNewsletter({ title: '', frequency: '', description: '', image: '' });
    } else {
      alert('Please fill all fields before publishing.');
    }
  };
  const [name, setName] = useState('');

  useEffect(() => {
    const storedName = localStorage.getItem('email');
    if (storedName) {
      setName(storedName);
    }
  }, []);

  return (
    <div className="newsletter-page">
      {/* Top Bar */}
      <div className="top-bar">
      <span className="app-name" onClick={() => navigate("/home")} style={{ cursor: "pointer" }}>
      VESIT Link
    </span>
        <input type="text" placeholder="Search..." className="search-bar" />
        <div className="user-profile">
          <Link to={`/profile/${name}`}  className="user-profile-link">
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
      <h1 className="newsletter-header">Alumni Newsletter</h1>

      {/* Conditionally Render Publish Section for Alumni */}
      {userRole === 'Alumni' && (
        <div className="publish-section">
          <h2>Publish a Newsletter</h2>
          <input
            type="text"
            placeholder="Title"
            value={newNewsletter.title}
            onChange={(e) => setNewNewsletter({ ...newNewsletter, title: e.target.value })}
          />
          <input
            type="text"
            placeholder="Frequency (e.g., Weekly, Monthly)"
            value={newNewsletter.frequency}
            onChange={(e) => setNewNewsletter({ ...newNewsletter, frequency: e.target.value })}
          />
          <textarea
            placeholder="Description"
            value={newNewsletter.description}
            onChange={(e) => setNewNewsletter({ ...newNewsletter, description: e.target.value })}
          />
          <input
            type="text"
            placeholder="Image URL"
            value={newNewsletter.image}
            onChange={(e) => setNewNewsletter({ ...newNewsletter, image: e.target.value })}
          />
          <button onClick={handlePublish} className="publish-button">Publish Newsletter</button>
        </div>
      )}

      {/* Display Existing Newsletters */}
      <div className="newsletter-container">
        {newsletters.map((newsletter, index) => (
          <div key={index} className="newsletter-card">
            <img src={newsletter.image} alt={newsletter.title} className="newsletter-image" />
            <p className="newsletter-frequency">{newsletter.frequency}</p>
            <h2 className="newsletter-title">{newsletter.title}</h2>
            <p className="newsletter-description">{newsletter.description}</p>
            <input type="email" placeholder="Enter your email" className="newsletter-email" />
            <button className="newsletter-subscribe">Subscribe Now</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsletterPage;
