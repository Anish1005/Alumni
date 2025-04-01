import React, { useState, useEffect } from 'react';
import axios from 'axios'; // ✅ Import Axios
import { Shield, Award, Briefcase, Book, Users, Star, Medal } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; 
import './Profile.css';
import { useParams } from 'react-router-dom';

const ProfilePage = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const { email } = useParams(); // ✅ Get email from URL

    useEffect(() => {
        axios.get(`http://localhost:5000/api/profile/${email}`)
            .then(response => setUserData(response.data))
            .catch(error => console.error("Error fetching profile:", error));
    }, [email]); // ✅ Use email as dependency

    if (!userData) return <p>Loading profile...</p>; // ✅ Show loading state

    const getAchievementIcon = (type) => {
        switch (type) {
            case 'workshop': return <Book />;
            case 'internship': return <Briefcase />;
            case 'community': return <Users />;
            default: return <Star />;
        }
    };

    return (
        <div className="profile-container">
            <div className="profile-header">
                <img src={userData.avatar} alt={userData.firstname} className="profile-avatar" />
                <div className="profile-info">
                    <h1 className="profile-name">{userData.firstname} {userData.lastname}</h1>
                    <div className="profile-details">
                        <span>{userData.role}</span>
                        <span>•</span>
                        <span>{userData.department}</span>
                        <span>•</span>
                        <span>Batch of {userData.batch}</span>
                    </div>
                </div>
                <div className="profile-points">
                    <div className="points-value">
                        {Object.values(userData.stats).reduce((a, b) => a + b, 0)}
                    </div>
                    <div className="points-label">Total Points</div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="stats-grid">
                <div className="stat-card">
                    <Book className="stat-icon" />
                    <div className="stat-value">{userData.stats.eventsAttended}</div>
                    <div className="stat-label">Events</div>
                </div>
                <div className="stat-card">
                    <Briefcase className="stat-icon" />
                    <div className="stat-value">{userData.stats.internshipsCompleted}</div>
                    <div className="stat-label">Internships</div>
                </div>
                <div className="stat-card">
                    <Shield className="stat-icon" />
                    <div className="stat-value">{userData.stats.projectsCompleted}</div>
                    <div className="stat-label">Projects</div>
                </div>
                <div className="stat-card" onClick={() => navigate('/connections')} style={{ cursor: 'pointer' }}>
                    <Users className="stat-icon" />
                    <div className="stat-value">{userData.stats.connectionsCount}</div>
                    <div className="stat-label">Connections</div>
                </div>
            </div>

            {/* Achievements Section */}
            <div className="section-card">
                <h2 className="section-title">Achievements</h2>
                <div className="achievements-grid">
                    {userData.achievements.map((achievement, index) => (
                        <div key={index} className="achievement-card">
                            <div className="achievement-icon">{getAchievementIcon(achievement.icon)}</div>
                            <div className="achievement-content">
                                <div className="achievement-title">{achievement.title}</div>
                                <div className="achievement-description">{achievement.description}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Recent Activity */}
            <div className="section-card">
                <h2 className="section-title">Recent Activity</h2>
                <div className="activity-list">
                    {userData.activities.map((activity, index) => (
                        <div key={index} className="activity-card">
                            <div className="activity-icon">{getAchievementIcon(activity.type)}</div>
                            <div className="activity-content">
                                <div className="achievement-title">{activity.title}</div>
                                <div className="achievement-description">{new Date(activity.date).toLocaleDateString()}</div>
                            </div>
                            <div className="activity-points">
                                <Medal className="points-icon" />
                                <span>{activity.points} points</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
