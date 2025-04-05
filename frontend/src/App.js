import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import { useState } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./Admin/theme";
import ApplyForm from "./Component/JobBoard/ApplyForm";
import Login from "./Component/Login/Login";
import Signup from "./Component/Signup/Signup";
import VideoCall from "./Component/VideoCall/Screens/Lobby";
import Room from "./Component/VideoCall/Screens/Room";
import { EventProvider } from "./Admin/AdminComponents/Event/EventContext";
import AddEvent from "./Admin/AdminComponents/Event/AddEvent";
import EventList from "./Admin/AdminComponents/Event/EventList";
import Home from "./Component/Home/Home";
import Profile from "./Component/Profile/Profile";
import Forum from "./Component/Forum/Forum";
import Chatbot from "./Component/Chatbot/Chatbot";
import NewsletterPage from "./Component/Newsletters/NewsletterPage";
import Newsletter1 from "./Component/Newsletters/Newsletter";
import Message from "./Component/Message/Message";
import AdminLogin from "./Admin/AdminLogin";
import ProtectedAdminRoute from "./Admin/ProtectedAdminRoute";
import Connections from './Component/Profile/Connections';

import Sidebar from "./Admin/AdminComponents/global/Sidebar";
import Topbar from "./Admin/AdminComponents/global/Topbar";
import AdminDashboard from "./Admin/AdminComponents/dashboard/Dashboard";
import Team from "./Admin/AdminComponents/team/team";
import Contacts from "./Admin/AdminComponents/contacts/contacts";
import Invoices from "./Admin/AdminComponents/invoices/invoices";
import Form from "./Admin/AdminComponents/form/userForms";
import Bar from "./Admin/AdminComponents/bar/bar";
import Pie from "./Admin/AdminComponents/pie/pie";
import Line from "./Admin/AdminComponents/line/line";
import FAQ from "./Admin/AdminComponents/faq/faq";
import Calendar from "./Admin/AdminComponents/calendar/calendar";
import Geography from "./Admin/AdminComponents/geography/geography";
import JobBoard from "./Component/JobBoard/JobBoard";
import People from './Component/People/People';

function App() {
  const location = useLocation();
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  // Check if the current path is an admin route
  const isAdminPage = location.pathname.startsWith("/admin");

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="App">
          {isAdminPage ? (
            // Admin Layout with Sidebar & Topbar
            <div style={{ display: "flex" }}>
              <Sidebar isSidebar={isSidebar} />
              <div style={{ flexGrow: 1 }}>
                <Topbar setIsSidebar={setIsSidebar} />
                <Routes>
                  <Route path="/admin-login" element={<AdminLogin />} />
                  <Route element={<ProtectedAdminRoute />}>
                    <Route path="/admin-dashboard" element={<AdminDashboard />} />
                    <Route path="/admin-team" element={<Team />} />
                    <Route path="/admin-contacts" element={<Contacts />} />
                    <Route path="/admin-invoices" element={<Invoices />} />
                    <Route path="/admin-form" element={<Form />} />
                    <Route path="/admin-addevent" element={<AddEvent />} />
                    <Route path="/admin-listevent" element={<EventList />} />
                    <Route path="/admin-bar" element={<Bar />} />
                    <Route path="/admin-pie" element={<Pie />} />
                    <Route path="/admin-line" element={<Line />} />
                    <Route path="/admin-faq" element={<FAQ />} />
                    <Route path="/admin-calendar" element={<Calendar />} />
                    <Route path="/admin-geography" element={<Geography />} />
                  </Route>
                </Routes>
              </div>
            </div>
          ) : (
            // Public User Routes (No Sidebar)
            <>
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/video_call" element={<VideoCall />} />
                <Route path="/video_call/room/:roomId" element={<Room />} />
                <Route path="/home" element={<Home />} />
                {/* <Route path="/profile" element={<Profile />} /> */}
                <Route path="/profile/:email" element={<Profile />} />
                <Route path="/forum" element={<Forum />} />
                <Route path="/apply" element={<ApplyForm />} />
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
                <Route path="/newsletter1" element={<Newsletter1 />} />
                <Route path="/messages" element={<Message />} />
                <Route path="/connections" element={<Connections />} />

                {/* Added Job Board Route */}
                <Route path="/job-board" element={<JobBoard />} />
                <Route path="/people" element={<People />} />

              </Routes>
              <Chatbot />
            </>
          )}
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
