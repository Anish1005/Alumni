import React from 'react';
import axios from 'axios';
import './ResumeUpdate.css';
import {Link} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';

const ResumeUpload = () => {
  const [file, setFile] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleFileChange = event => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Please upload a resume!');
      return;
    }

    const formData = new FormData();
    formData.append('resume', file);

    setLoading(true);
    try {
      const response = await axios.post(
        'http://localhost:5000/api/upload-resume',
        formData,
        {
          headers: {'Content-Type': 'multipart/form-data'},
        }
      );

      setProfile(response.data);
    } catch (error) {
      console.error('Error uploading resume:', error);
      alert('Failed to process resume!');
    }
    setLoading(false);
  };

  const [name, setName] = useState('');

  useEffect(() => {
    const storedName = localStorage.getItem('email');
    if (storedName) {
      setName(storedName);
    }
  }, []);
  return (
    <div>
      {/* Top Bar */}
      <div className="top-bar">
        <span
          className="app-name"
          onClick={() => navigate('/home')}
          style={{cursor: 'pointer'}}
        >
          VESIT Link
        </span>
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
      <div className="upload-section">
        <h2>Upload Resume</h2>
        <input type="file" accept=".pdf,.docx" onChange={handleFileChange} />
        <button onClick={handleUpload} disabled={loading}>
          {loading ? 'Processing...' : 'Upload & Extract'}
        </button>
      </div>

      {profile && (
        <div className="profile">
          <h3>Extracted Profile</h3>
          <p>
            <b>Name:</b> {profile.name}
          </p>
          <p>
            <b>Email:</b> {profile.email}
          </p>
          <p>
            <b>Phone:</b> {profile.phone}
          </p>
          <p className="profile-section">
            <b>Education:</b> {profile.education}
          </p>

          <div className="profile-section">
            <b>Experience:</b>
            <ul>
              {Array.isArray(profile.experience) ? (
                profile.experience.map((exp, index) => (
                  <li key={index}>{exp}</li>
                ))
              ) : profile.experience ? (
                profile.experience
                  .split(/\n|•|-|:/)
                  .map(
                    (exp, index) =>
                      exp.trim() && <li key={index}>{exp.trim()}</li>
                  )
              ) : (
                <li>No experience data available</li>
              )}
            </ul>
          </div>

          <div className="profile-section">
            <b>Skills:</b>
            <ul>
              {profile.skills?.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeUpload;
