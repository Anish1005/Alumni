import React from "react";
import "./Newsletter.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fontsource/libre-baskerville";

const Newsletter1 = () => {
  return (
    <div className="single-newsletter-container">
      {/* Header Section */}
      <header className="single-newsletter-header">
    <h1 className="single-newsletter-title">Alumni Success Stories</h1>
    <div className="single-newsletter-meta">
        <span className="single-newsletter-issue-badge">ISSUE #10</span>
        <span className="single-newsletter-institute">VESIT</span>
        <span className="single-newsletter-date">5 February 2025</span>
    </div>
    </header>

      {/* Main Image Section */}
      <div className="single-newsletter-image-container">
        <img
          src="https://images.pexels.com/photos/3153201/pexels-photo-3153201.jpeg"
          alt="Alumni Group"
          className="single-newsletter-main-image"
        />
        <div className="single-newsletter-image-caption">CEO - EMILY CARTER</div>
      </div>

      {/* Content Section */}
      <div className="single-newsletter-content">
        {/* Left Section (Achievements) */}
        <div className="single-newsletter-left">
          <h2 className="single-newsletter-achievements-title">Celebrating Our Alumni’s Achievements!</h2>

          <div className="single-newsletter-achievements">
            {/* Left Column */}
            <div className="achievements-left">
              <h4>Welcome to this month’s Alumni Success Stories Newsletter!</h4>
              <p>
                This issue highlights inspiring journeys of alumni who have made 
                remarkable strides in their careers, businesses, and communities.
              </p>

              <h4>Spotlight Story: From Student to CEO – Emily Carter’s Journey</h4>
              <p>
                After graduating from Westbridge University with a Computer Science degree, 
                Emily Carter founded TechNova, an AI-driven healthcare startup. 
                Now a global company operating in 12+ countries, TechNova partners 
                with Google Health and IBM Watson.
              </p>

              <blockquote className="single-quote">
                “The alumni network played a huge role in my success. The connections 
                I made helped me find investors and mentors who guided me through early 
                challenges.”
                <span className="quote-author">– Emily Carter</span>
              </blockquote>
            </div>

            {/* Right Column */}
            <div className="achievements-right">
              <h4>Alumni Making an Impact</h4>

              <div className="single-alumni-story">
                <p><strong>🌍 David Patel – Championing Sustainability</strong></p>
                <p>
                  A Westbridge University graduate, David Patel leads sustainability efforts 
                  at Tesla, reducing carbon emissions in EV production. He won the Global 
                  Green Innovator Award for his eco-friendly initiatives.
                </p>
              </div>

              <div className="single-alumni-story">
                <p><strong>💡 Sophia Reynolds – Innovating in Tech</strong></p>
                <p>
                  As a Lead Engineer at Microsoft, Sophia Reynolds helped develop HoloSync, 
                  an AR/VR tool for remote collaboration. Her innovations were featured in 
                  TechCrunch and CES 2025.
                </p>
              </div>

              <div className="single-alumni-story">
                <p><strong>🏅 Marcus Johnson – Advancing Education</strong></p>
                <p>
                  Founder of NextGen Scholars, Marcus Johnson has provided scholarships and 
                  mentorship to 5,000+ students, helping them access top-tier education and 
                  career opportunities.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <aside className="single-newsletter-right">
          <h3 className="single-newsletter-expect-title">In this newsletter you can expect:</h3>
          <ul className="single-newsletter-list">
            <li>Exclusive Interviews</li>
            <li>Entrepreneurial Spotlights</li>
            <li>Career Achievements</li>
            <li>Community Contributions</li>
            <li>Alumni Awards & Recognition</li>
            <li>Trailblazers in Innovation</li>
          </ul>
        </aside>
      </div>
    </div>
  );
};

export default Newsletter1;
