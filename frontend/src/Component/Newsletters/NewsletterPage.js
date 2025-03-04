import React from 'react';
import './NewsletterPage.css';

const NewsletterPage = () => {
  const newsletters = [
    {
      title: 'Alumni Success Stories',
      frequency: 'Weekly',
      description: 'Discover inspiring journeys of alumni who have excelled in their careers, from entrepreneurship to leadership roles. Read about their challenges, the skills they leveraged, and the strategies that helped them succeed. Gain valuable insights and motivation for your own professional growth.',
      image: 'https://images.pexels.com/photos/3184405/pexels-photo-3184405.jpeg',
    },
    {
      title: 'Career Insights & Networking',
      frequency: 'Bi-Weekly',
      description: 'Stay updated with career trends, job opportunities, and industry insights tailored for alumni. Get advice from experts, learn about networking events, and find mentorship opportunities that can help you grow professionally and expand your career prospects.',
      image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg',
    },
    {
      title: 'Alumni Events & Reunions',
      frequency: 'Monthly',
      description: 'Join alumni networking events, reunions, and professional meetups. Strengthen connections with old classmates and build new professional relationships. Stay informed about upcoming gatherings that foster career growth and personal development within the alumni community.',
      image: 'https://images.pexels.com/photos/3183153/pexels-photo-3183153.jpeg',
    },
  ];

  return (
    <div className="newsletter-page">
      <h1 className="newsletter-header">Alumni Newsletter</h1>
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
