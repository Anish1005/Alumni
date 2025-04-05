import './People.css';
import React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
    MapPin,
    GraduationCap,
    Users,
    MessageCircle,
    Search,
    Briefcase,
    Calendar
} from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';

const People = () => {
    const [name, setName] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredPeople, setFilteredPeople] = useState([]);

    useEffect(() => {
        const storedName = localStorage.getItem('email');
        if (storedName) {
            setName(storedName);
        }
    }, []);

    // List of 50 people with profile details
    const peopleList = [
        { id: 1, name: "Aanya Patel", branch: "Computer Science", graduationYear: "2022", description: "Machine Learning Engineer at Tesla", avatar: "https://randomuser.me/api/portraits/women/1.jpg" },
        { id: 2, name: "Rohan Sharma", branch: "Electronics", graduationYear: "2021", description: "Hardware Designer at Intel", avatar: "https://randomuser.me/api/portraits/men/2.jpg" },
        { id: 3, name: "Neha Gupta", branch: "Information Technology", graduationYear: "2023", description: "Full Stack Developer at Microsoft", avatar: "https://randomuser.me/api/portraits/women/3.jpg" },
        { id: 4, name: "Arjun Singh", branch: "Computer Science", graduationYear: "2020", description: "Project Manager at Amazon", avatar: "https://randomuser.me/api/portraits/men/4.jpg" },
        { id: 5, name: "Divya Mehta", branch: "Electronics", graduationYear: "2024", description: "IoT Specialist at Bosch", avatar: "https://randomuser.me/api/portraits/women/5.jpg" },
        { id: 6, name: "Karan Malhotra", branch: "Computer Science", graduationYear: "2022", description: "Cloud Architect at Google", avatar: "https://randomuser.me/api/portraits/men/6.jpg" },
        { id: 7, name: "Pooja Verma", branch: "Information Technology", graduationYear: "2021", description: "UI/UX Designer at Adobe", avatar: "https://randomuser.me/api/portraits/women/7.jpg" },
        { id: 8, name: "Vikram Choudhary", branch: "Computer Science", graduationYear: "2023", description: "Blockchain Developer at Polygon", avatar: "https://randomuser.me/api/portraits/men/8.jpg" },
        { id: 9, name: "Meera Kapoor", branch: "Electronics", graduationYear: "2020", description: "VLSI Engineer at Qualcomm", avatar: "https://randomuser.me/api/portraits/women/9.jpg" },
        { id: 10, name: "Rahul Desai", branch: "Information Technology", graduationYear: "2024", description: "DevOps Engineer at Accenture", avatar: "https://randomuser.me/api/portraits/men/10.jpg" },
        { id: 11, name: "Kritika Joshi", branch: "Computer Science", graduationYear: "2022", description: "Data Scientist at IBM", avatar: "https://randomuser.me/api/portraits/women/11.jpg" },
        { id: 12, name: "Siddharth Kumar", branch: "Electronics", graduationYear: "2021", description: "Circuit Designer at AMD", avatar: "https://randomuser.me/api/portraits/men/12.jpg" },
        { id: 13, name: "Nisha Patel", branch: "Information Technology", graduationYear: "2023", description: "Cybersecurity Analyst at Deloitte", avatar: "https://randomuser.me/api/portraits/women/13.jpg" },
        { id: 14, name: "Varun Agarwal", branch: "Computer Science", graduationYear: "2020", description: "AI Researcher at OpenAI", avatar: "https://randomuser.me/api/portraits/men/14.jpg" },
        { id: 15, name: "Tanya Saxena", branch: "Electronics", graduationYear: "2024", description: "Embedded Systems Engineer at Samsung", avatar: "https://randomuser.me/api/portraits/women/15.jpg" },
        { id: 16, name: "Raj Kapoor", branch: "Computer Science", graduationYear: "2022", description: "Software Architect at Oracle", avatar: "https://randomuser.me/api/portraits/men/16.jpg" },
        { id: 17, name: "Anjali Sharma", branch: "Information Technology", graduationYear: "2021", description: "Product Manager at Flipkart", avatar: "https://randomuser.me/api/portraits/women/17.jpg" },
        { id: 18, name: "Mohit Verma", branch: "Computer Science", graduationYear: "2023", description: "Game Developer at Electronic Arts", avatar: "https://randomuser.me/api/portraits/men/18.jpg" },
        { id: 19, name: "Kavita Singh", branch: "Electronics", graduationYear: "2020", description: "Robotics Engineer at Boston Dynamics", avatar: "https://randomuser.me/api/portraits/women/19.jpg" },
        { id: 20, name: "Anuj Mehta", branch: "Information Technology", graduationYear: "2024", description: "Database Administrator at MongoDB", avatar: "https://randomuser.me/api/portraits/men/20.jpg" },
        { id: 21, name: "Shweta Gupta", branch: "Computer Science", graduationYear: "2022", description: "AR/VR Developer at Meta", avatar: "https://randomuser.me/api/portraits/women/21.jpg" },
        { id: 22, name: "Deepak Shah", branch: "Electronics", graduationYear: "2021", description: "Network Engineer at Cisco", avatar: "https://randomuser.me/api/portraits/men/22.jpg" },
        { id: 23, name: "Ritu Khanna", branch: "Information Technology", graduationYear: "2023", description: "Business Analyst at McKinsey", avatar: "https://randomuser.me/api/portraits/women/23.jpg" },
        { id: 24, name: "Akash Jain", branch: "Computer Science", graduationYear: "2020", description: "Quantum Computing Researcher at IBM", avatar: "https://randomuser.me/api/portraits/men/24.jpg" },
        { id: 25, name: "Preeti Tiwari", branch: "Electronics", graduationYear: "2024", description: "Telecommunications Engineer at Nokia", avatar: "https://randomuser.me/api/portraits/women/25.jpg" },
        { id: 26, name: "Sameer Deshmukh", branch: "Computer Science", graduationYear: "2022", description: "Software Engineer at Twitter", avatar: "https://randomuser.me/api/portraits/men/26.jpg" },
        { id: 27, name: "Neha Sharma", branch: "Information Technology", graduationYear: "2021", description: "Technical Writer at Red Hat", avatar: "https://randomuser.me/api/portraits/women/27.jpg" },
        { id: 28, name: "Aditya Patil", branch: "Computer Science", graduationYear: "2023", description: "Mobile App Developer at Spotify", avatar: "https://randomuser.me/api/portraits/men/28.jpg" },
        { id: 29, name: "Sneha Das", branch: "Electronics", graduationYear: "2020", description: "Signal Processing Engineer at Siemens", avatar: "https://randomuser.me/api/portraits/women/29.jpg" },
        { id: 30, name: "Kunal Rastogi", branch: "Information Technology", graduationYear: "2024", description: "Cloud Security Engineer at Palo Alto", avatar: "https://randomuser.me/api/portraits/men/30.jpg" },
        { id: 31, name: "Shruti Mishra", branch: "Computer Science", graduationYear: "2022", description: "Frontend Developer at Netflix", avatar: "https://randomuser.me/api/portraits/women/31.jpg" },
        { id: 32, name: "Pranav Kumar", branch: "Electronics", graduationYear: "2021", description: "Microprocessor Designer at ARM", avatar: "https://randomuser.me/api/portraits/men/32.jpg" },
        { id: 33, name: "Ishita Bose", branch: "Information Technology", graduationYear: "2023", description: "Digital Marketing Specialist at HubSpot", avatar: "https://randomuser.me/api/portraits/women/33.jpg" },
        { id: 34, name: "Gaurav Malhotra", branch: "Computer Science", graduationYear: "2020", description: "Backend Engineer at Salesforce", avatar: "https://randomuser.me/api/portraits/men/34.jpg" },
        { id: 35, name: "Priyanka Reddy", branch: "Electronics", graduationYear: "2024", description: "Automation Engineer at ABB", avatar: "https://randomuser.me/api/portraits/women/35.jpg" },
        { id: 36, name: "Rohit Prasad", branch: "Computer Science", graduationYear: "2022", description: "Systems Architect at Dell", avatar: "https://randomuser.me/api/portraits/men/36.jpg" },
        { id: 37, name: "Ananya Singh", branch: "Information Technology", graduationYear: "2021", description: "Quality Assurance at Infosys", avatar: "https://randomuser.me/api/portraits/women/37.jpg" },
        { id: 38, name: "Nikhil Menon", branch: "Computer Science", graduationYear: "2023", description: "Data Engineer at Databricks", avatar: "https://randomuser.me/api/portraits/men/38.jpg" },
        { id: 39, name: "Shalini Kapoor", branch: "Electronics", graduationYear: "2020", description: "Optoelectronics Engineer at Sony", avatar: "https://randomuser.me/api/portraits/women/39.jpg" },
        { id: 40, name: "Vishal Sharma", branch: "Information Technology", graduationYear: "2024", description: "IT Consultant at TCS", avatar: "https://randomuser.me/api/portraits/men/40.jpg" },
        { id: 41, name: "Aditi Verma", branch: "Computer Science", graduationYear: "2022", description: "Information Security Analyst at EY", avatar: "https://randomuser.me/api/portraits/women/41.jpg" },
        { id: 42, name: "Rajat Gupta", branch: "Electronics", graduationYear: "2021", description: "Control Systems Engineer at General Electric", avatar: "https://randomuser.me/api/portraits/men/42.jpg" },
        { id: 43, name: "Jyoti Patel", branch: "Information Technology", graduationYear: "2023", description: "Scrum Master at Atlassian", avatar: "https://randomuser.me/api/portraits/women/43.jpg" },
        { id: 44, name: "Vivek Desai", branch: "Computer Science", graduationYear: "2020", description: "NLP Engineer at Hugging Face", avatar: "https://randomuser.me/api/portraits/men/44.jpg" },
        { id: 45, name: "Sonali Khanna", branch: "Electronics", graduationYear: "2024", description: "Power Electronics Engineer at Schneider", avatar: "https://randomuser.me/api/portraits/women/45.jpg" },
        { id: 46, name: "Karthik Rao", branch: "Computer Science", graduationYear: "2022", description: "Computer Vision Engineer at NVIDIA", avatar: "https://randomuser.me/api/portraits/men/46.jpg" },
        { id: 47, name: "Neha Agarwal", branch: "Information Technology", graduationYear: "2021", description: "Tech Evangelist at Slack", avatar: "https://randomuser.me/api/portraits/women/47.jpg" },
        { id: 48, name: "Mihir Dubey", branch: "Computer Science", graduationYear: "2023", description: "Site Reliability Engineer at Airbnb", avatar: "https://randomuser.me/api/portraits/men/48.jpg" },
        { id: 49, name: "Sarika Jain", branch: "Electronics", graduationYear: "2020", description: "Semiconductor Process Engineer at TSMC", avatar: "https://randomuser.me/api/portraits/women/49.jpg" },
        { id: 50, name: "Dhruv Saxena", branch: "Information Technology", graduationYear: "2024", description: "Technology Consultant at KPMG", avatar: "https://randomuser.me/api/portraits/men/50.jpg" }
    ];

    // Filter people based on search term
    useEffect(() => {
        const results = peopleList.filter(person =>
            person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            person.branch.toLowerCase().includes(searchTerm.toLowerCase()) ||
            person.graduationYear.includes(searchTerm) ||
            person.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredPeople(results);
    }, [searchTerm]);

    // Initialize filtered people to show all people initially
    useEffect(() => {
        setFilteredPeople(peopleList);
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
        <div className="home-container">
            {/* Top Bar */}
            <div className="top-bar">
                <span className="app-name">VESIT Link</span>
                <div className="search-container">
                    <Search size={16} className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search people by name, branch, graduation year..."
                        className="search-bar"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="user-profile">
                    <Link to={`/profile/${name}`} className="user-profile-link">
                        <img
                            src="https://randomuser.me/api/portraits/men/4.jpg"
                            alt="User"
                            className="profile-pic"
                        />
                        <span style={{ fontSize: '17px', fontWeight: 'bold' }}>
                            {name ? name : 'User'}!
                        </span>
                    </Link>
                </div>
            </div>

            {/* Main Content with Three Columns */}
            <div className="main-content">
                {/* Left Navigation Bar */}
                <div className="left-bar">
                    <Link to={`/profile/${name}`} >
                        <button>Profile</button>
                    </Link>
                    <Link to="/people" className="find-people">
                        <button>Find People!</button>
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
                        <button>🚀 Connect with Seniors!</button>
                    </Link>
                </div>

                {/* Middle Section - Find People */}
                <div className="middle-section">
                    <div className="find-people-header">
                        <h1>Find People</h1>
                        <p className="results-count">{filteredPeople.length} people found</p>
                    </div>

                    <div className="people-grid">
                        {filteredPeople.map(person => (
                            <div key={person.id} className="person-card">
                                <img src={person.avatar} alt={person.name} className="person-avatar" />
                                <div className="person-details">
                                    <h4 className="person-name">{person.name}</h4>
                                    <div className="person-info">
                                        <p className="person-branch">
                                            <GraduationCap size={16} className="info-icon" />
                                            {person.branch}
                                        </p>
                                        <p className="person-graduation">
                                            <Calendar size={16} className="info-icon" />
                                            Class of {person.graduationYear}
                                        </p>
                                        <p className="person-description">
                                            <Briefcase size={16} className="info-icon" />
                                            {person.description}
                                        </p>
                                    </div>
                                    <div className="person-actions">
                                        <button className="connect-btn">Connect</button>
                                        <button className="message-btn">
                                            <MessageCircle size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Bar - Connections */}
                <div className='people-right-bar'>
                    <div className="connections-list-1">
                        <h3 className="section-title-1">Connections</h3>
                        {userData.connections.map(connection => (
                            <div key={connection.id} className="connection-card-1">
                                <img
                                    src={connection.avatar}
                                    alt={connection.name}
                                    className="connection-avatar-1"
                                />
                                <div className="connection-info-1">
                                    <h5 className="connection-name-1">{connection.name}</h5>
                                    <p className="connection-role-1">
                                        {connection.role} at{' '}
                                        <span className="connection-company-1">
                                            {connection.company}
                                        </span>
                                    </p>
                                    <p className="connection-location-1">
                                        <MapPin size={14} /> {connection.location}
                                    </p>
                                </div>
                                <p className="mutual-connections-1">
                                    <Users size={16} /> {connection.mutualConnections} mutuals
                                </p>
                                <button className="btn btn-outline-primary message-btn-1">
                                    <MessageCircle size={16} /> Message
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default People;