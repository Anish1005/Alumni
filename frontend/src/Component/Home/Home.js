import React from 'react';
import './Home.css';
import EventList from '../Event/EventList';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="home-container">
            {/* Top Bar */}
            <div className="top-bar">
                <span className="app-name">VESIT Link</span>
                <input type="text" placeholder="Search..." className="search-bar" />
                <div className="user-profile">
                    <Link to="/profile" className="user-profile-link">
                        <img
                            src="https://cdn-icons-png.flaticon.com/128/1144/1144709.png"
                            alt="User"
                            className="profile-pic"
                        />
                        <span className="user-name">John Doe</span>
                    </Link>
                </div>
            </div>

            {/* Main Content with Three Columns */}
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
                    <Link to="/forums">
                        <button>Forums</button>
                    </Link>
                    <Link to="/newsletters">
                        <button>Newsletters</button>
                    </Link>
                    <Link to="/video-call">
                        <button>Video Call</button>
                    </Link>
                </div>

                {/* Center Column for Internships */}
                <div className="center-bar">
                    <h2>Find Your Own Path</h2>
                    <div className="job-post">
                        <div className="job-info">
                            <h3>Software Engineering Intern</h3>
                            <p>Company: TechCorp</p>
                            <p>Requirements: React, Node.js, PostgreSQL</p>
                        </div>
                        <button>Apply Now</button>
                    </div>
                    <div className="job-post">
                        <div className="job-info">
                            <h3>Data Analyst Intern</h3>
                            <p>Company: DataTech</p>
                            <p>Requirements: Python, SQL, Machine Learning</p>
                        </div>
                        <button>Apply Now</button>
                    </div>
                    <div className="job-post">
                        <div className="job-info">
                            <h3>UI/UX Design Intern</h3>
                            <p>Company: DesignHive</p>
                            <p>Requirements: Figma, Adobe XD, User Research</p>
                        </div>
                        <button>Apply Now</button>
                    </div>
                    <div className="job-post">
                        <div className="job-info">
                            <h3>Marketing Intern</h3>
                            <p>Company: BrandUp</p>
                            <p>Requirements: Social Media, Content Creation</p>
                        </div>
                        <button>Apply Now</button>
                    </div>
                    <div className="job-post">
                        <div className="job-info">
                            <h3>Business Analyst Intern</h3>
                            <p>Company: Insight Consulting</p>
                            <p>Requirements: Data Analysis, Excel, Power BI</p>
                        </div>
                        <button>Apply Now</button>
                    </div>
                    <div className="job-post">
                        <div className="job-info">
                            <h3>Software Developer Intern</h3>
                            <p>Company: CodeSprint</p>
                            <p>Requirements: Python, Java, Git</p>
                        </div>
                        <button>Apply Now</button>
                    </div>
                    <div className="job-post">
                        <div className="job-info">
                            <h3>Graphic Design Intern</h3>
                            <p>Company: PixelPro</p>
                            <p>Requirements: Photoshop, Illustrator, Typography</p>
                        </div>
                        <button>Apply Now</button>
                    </div>
                    <div className="job-post">
                        <div className="job-info">
                            <h3>Product Management Intern</h3>
                            <p>Company: ProductLab</p>
                            <p>Requirements: Market Research, Agile</p>
                        </div>
                        <button>Apply Now</button>
                    </div>
                    <div className="job-post">
                        <div className="job-info">
                            <h3>HR Intern</h3>
                            <p>Company: PeopleFirst</p>
                            <p>Requirements: Recruitment, Employee Relations</p>
                        </div>
                        <button>Apply Now</button>
                    </div>
                    <div className="job-post">
                        <div className="job-info">
                            <h3>Video Editing Intern</h3>
                            <p>Company: MediaWorks</p>
                            <p>Requirements: Adobe Premiere, After Effects</p>
                        </div>
                        <button>Apply Now</button>
                    </div>
                    <div className="job-post">
                        <div className="job-info">
                            <h3>Sales Intern</h3>
                            <p>Company: SalesForce</p>
                            <p>Requirements: CRM, Negotiation</p>
                        </div>
                        <button>Apply Now</button>
                    </div>
                    <div className="job-post">
                        <div className="job-info">
                            <h3>Data Science Intern</h3>
                            <p>Company: DataInsights</p>
                            <p>Requirements: Python, R, Data Visualization</p>
                        </div>
                        <button>Apply Now</button>
                    </div>
                </div>

                {/* Right Column for Peer Discovery and Events */}
                <div className="right-bar">
                    <div className="discover-peers">
                        <h2>Discover Your Peers</h2>
                        <ul>
                            <li>
                                <div className="peer-card">
                                    <img className="peer-pic" src="https://randomuser.me/api/portraits/men/1.jpg" alt="Alice Johnson" />
                                    <div className="peer-info">
                                        <h3>Alice Johnson</h3>
                                        <p>Frontend Developer at XYZ Inc. Passionate about design and usability.</p>
                                    </div>
                                    <button>+Follow</button>
                                </div>
                            </li>
                            <li>
                                <div className="peer-card">
                                    <img className="peer-pic" src="https://randomuser.me/api/portraits/women/2.jpg" alt="Michael Smith" />
                                    <div className="peer-info">
                                        <h3>Michael Smith</h3>
                                        <p>Data Scientist. Enthusiast for machine learning and analytics.</p>
                                    </div>
                                    <button>+Follow</button>
                                </div>
                            </li>
                            <li>
                                <div className="peer-card">
                                    <img className="peer-pic" src="https://randomuser.me/api/portraits/women/3.jpg" alt="Emma Wilson" />
                                    <div className="peer-info">
                                        <h3>Emma Wilson</h3>
                                        <p>UI/UX Designer. Always learning new trends and improving designs.</p>
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
