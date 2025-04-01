import React from 'react';
import './Forum.css';
import {Link} from 'react-router-dom';
import {useState, useEffect} from 'react';

const ForumPage = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: 'How to Learn React?',
      author: 'John Doe',
      time: '10 mins ago',
      content:
        'Looking for the best way to get started with React. Any suggestions?',
      replies: [],
    },
    {
      id: 2,
      title: 'CSS Grid vs Flexbox',
      author: 'Jane Smith',
      time: '1 hour ago',
      content: 'When should I use CSS Grid instead of Flexbox?',
      replies: [],
    },
    {
      id: 3,
      title: 'CSS Grid vs Flexbox',
      author: 'Jane Smith',
      time: '1 hour ago',
      content: 'When should I use CSS Grid instead of Flexbox?',
      replies: [],
    },
  ]);

  const [replyText, setReplyText] = useState('');
  const [activePost, setActivePost] = useState(null); // Tracks which post is being replied to

  const handleReplySubmit = postId => {
    if (!replyText.trim()) return;

    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === postId
          ? {...post, replies: [...post.replies, replyText]}
          : post
      )
    );
    setReplyText('');
    setActivePost(null); // Reset active post after reply
  };

  const [name, setName] = useState('');
  
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

      <div className="main-content">
        {/* Left Sidebar */}
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
          <Link to="/newsletters">
            <button>Newsletters</button>
          </Link>
          <Link to="/video_call">
            <button>Video Call</button>
          </Link>
        </div>

        {/* Forum Content */}
        <div className="center-bar">
          <div className="forum-container">
            <div className="forum-posts">
              {posts.map(post => (
                <div key={post.id} className="forum-post">
                  <div className="post-header">
                    <div className="avatar">{post.author[0]}</div>
                    <div>
                      <p className="post-author">{post.author}</p>
                      <p className="post-time">{post.time}</p>
                    </div>
                  </div>

                  <h3 className="post-title">{post.title}</h3>

                  {/* Hide other posts' content while typing a reply */}
                  {(activePost === null || activePost === post.id) && (
                    <p className="post-content">{post.content}</p>
                  )}

                  {/* Reply Section */}
                  <div className="reply-section">
                    <input
                      type="text"
                      value={activePost === post.id ? replyText : ''}
                      onChange={e => {
                        setReplyText(e.target.value);
                        setActivePost(post.id);
                      }}
                      placeholder="Write your reply..."
                    />
                    <button onClick={() => handleReplySubmit(post.id)}>
                      Submit
                    </button>
                  </div>

                  {/* Replies Section */}
                  {post.replies.length > 0 && (
                    <div className="replies">
                      {post.replies.map((reply, index) => (
                        <div key={index} className="reply">
                          <div className="avatar small">U</div>
                          <p className="reply-text">{reply}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="right-bar">
          <div className="trending-topics">
            <h2>Trending Topics</h2>
            <ul>
              <li>Best JavaScript Frameworks in 2025</li>
              <li>Dark Mode vs Light Mode</li>
              <li>Tips for Remote Work</li>
            </ul>
          </div>
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
        </div>
      </div>
    </div>
  );
};

export default ForumPage;
