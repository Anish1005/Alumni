import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './Component/Login/Login';
import Signup from './Component/Signup/Signup';
import VideoCall from './Component/VideoCall/Screens/Lobby';
import Room from './Component/VideoCall/Screens/Room';
import { EventProvider } from './Component/Event/EventContext';
import AddEvent from './Component/Event/AddEvent';
import EventList from './Component/Event/EventList';
import Home from './Component/Home/Home';
import Profile from './Component/Profile/Profile';
import NewsletterPage from './Component/Newsletters/NewsletterPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/video_call" element={<VideoCall />} />
        <Route path="/video_call/room/:roomId" element={<Room />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />

        {/* Event Management */}
        <Route
          path="/list-event"
          element={
            <EventProvider>
              <EventList />
            </EventProvider>
          }
        />
        <Route
          path="/add-event"
          element={
            <EventProvider>
              <AddEvent />
            </EventProvider>
          }
        />
        <Route path="/newsletter" element={<NewsletterPage />} />
      </Routes>
    </div>
  );
}

export default App;
