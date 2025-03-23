import React from 'react';
import { Shield, Award, Briefcase, Book, Users, Star, Medal } from 'lucide-react';
import './Profile.css';

const ProfilePage = () => {
    const userData = {
        name: "Karan Singh",
        role: "Alumni",
        batch: "2020",
        department: "Computer Science",
        avatar: "https://randomuser.me/api/portraits/men/4.jpg",
        achievements: [
            { id: 1, title: "Workshop Expert", description: "Attended 10+ technical workshops", icon: "workshop" },
            { id: 2, title: "Intern Extraordinaire", description: "Completed 3 internships", icon: "internship" },
            { id: 3, title: "Community Leader", description: "Organized 5 college events", icon: "community" }
        ],
        stats: {
            eventsAttended: 15,
            internshipsCompleted: 3,
            projectsCompleted: 8,
            connectionsCount: 145
        },
        activities: [
            { id: 1, type: "workshop", title: "AI/ML Workshop", date: "2025-02-15", points: 50 },
            { id: 2, type: "internship", title: "Software Development Intern at Tech Corp", date: "2025-01-10", points: 100 },
            { id: 3, type: "project", title: "College App Development", date: "2024-12-20", points: 75 }
        ]
    };

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
            {/* Profile Header */}
            <div className="profile-header">
                <img
                    src={userData.avatar}
                    alt={userData.name}
                    className="profile-avatar"
                />
                <div className="profile-info">
                    <h1 className="profile-name">{userData.name}</h1>
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

            {/* Stats Cards */}
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
                <div className="stat-card">
                    <Users className="stat-icon" />
                    <div className="stat-value">{userData.stats.connectionsCount}</div>
                    <div className="stat-label">Connections</div>
                </div>
            </div>

            {/* Achievements Section */}
            <div className="section-card">
                <h2 className="section-title">Achievements</h2>
                <div className="achievements-grid">
                    {userData.achievements.map((achievement) => (
                        <div key={achievement.id} className="achievement-card">
                            <div className="achievement-icon">
                                {getAchievementIcon(achievement.icon)}
                            </div>
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
                    {userData.activities.map((activity) => (
                        <div key={activity.id} className="activity-card">
                            <div className="activity-icon">
                                {getAchievementIcon(activity.type)}
                            </div>
                            <div className="activity-content">
                                <div className="achievement-title">{activity.title}</div>
                                <div className="achievement-description">
                                    {new Date(activity.date).toLocaleDateString()}
                                </div>
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
