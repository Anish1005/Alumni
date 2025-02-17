import './App.css';
import {Route, Routes} from 'react-router-dom';
import Login from './Component/Login/Login';
import Signup from './Component/Signup/Signup';
import VideoCall from './Component/VideoCall/Screens/Lobby';
import Room from './Component/VideoCall/Screens/Room';
import {EventProvider} from './Component/Event/EventContext';
import AddEvent from './Component/Event/AddEvent';
import EventList from './Component/Event/EventList';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/video_call" element={<VideoCall />} />
        <Route path="/video_call/room/:roomId" element={<Room />} />

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
      </Routes>
    </div>
  );
}

export default App;
