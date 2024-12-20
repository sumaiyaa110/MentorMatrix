import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import FrontPage from "./Components/Hero/FrontPage";
import KeyFeatures from "./Components/KeyFeatures/KeyFeatures";
import HowItWorks from "./Components/HowItWorks/HowItWorks";
import TopMentorsTrendingSession from "./Components/TopMentorsTrendingSession/TopMentorsTrendingSession";
import ExploreTheCommunity from "./Components/ExploreTheCommunity/ExploreTheCommunity";
import NetworkingEvents from "./Components/ExploreTheCommunity/NetworkingEvents";
import BlogInsights from "./Components/ExploreTheCommunity/BlogInsights";
import CaseStudies from "./Components/ExploreTheCommunity/CaseStudies";
import MentorshipSummary from "./Components/MentorshipSummary/MentorshipSummary";
import ActivityFeed from "./Components/ActivityFeed/ActivityFeed";
import MentorProfilePage from "./Components/MentorProfilePage/MentorProfilePage";
import TopBar from "./Components/TopBar/TopBar";
import FeedbackReview from "./Components/FeedbackReview/FeedbackReview";
import AssignProjects from "./Components/AssignProjects/AssignProjects";
import Sidebar from "./Components/Menubar/Sidebar";
import MentorRegistrationForm from "./Components/MentorRegistrationForm/MentorRegistrationForm";
import Login from "./Components/Login/Login";
import Signup from "./Components/SignUp/Signup";
import AdminDashboard from "./Components/Dashboard/AdminDashboard";
import MentorDashboard from "./Components/Dashboard/MentorDashboard";
import MenteeDashboard from "./Components/Dashboard/MenteeDashboard";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import UpcomingSessions from "./Components/UpcomingSessions/UpcomingSessions";
import PerformanceMetrics from "./Components/PerformanceMetrics/PerformanceMetrics";
import StudyMaterials from "./Components/StudyMaterials/StudyMaterials";
import Certificates from "./Components/Certificates/Certificates";
import SessionHistory from "./Components/SessionHistory/SessionHistory";
import UploadMaterials from "./Components/UploadMaterials/UploadMaterials";
import ManageQuizzes from "./Components/ManageQuizzes/ManageQuizzes";
import MentorProfile from "./Components/MentorProfile/MentorProfile";
import SessionScheduler from "./Components/SessionScheduler/SessionScheduler";
import TrackMentors from "./Components/TrackMentors/TrackMentors";
import TrackMentees from "./Components/TrackMentees/TrackMentees";
import DeleteUser from "./Components/DeleteUser/DeleteUser";
import UserFeedback from "./Components/UserFeedback/UserFeedback";
import ManageSessions from "./Components/ManageSessions/ManageSessions";
import AboutUs from "./Components/AboutUs/AboutUs";
import ContactUs from "./Components/ContactUs/ContactUs";
import SessionList from "./Components/SessionList/SessionList";
import FAQs from "./Components/FAQs/FAQs";
import Feedback from "./Components/Feedback/Feedback";
import Profile from "./Components/Profile/Profile";
import ViewNotification from "./Components/ViewNotification/ViewNotification";
import FeedbackPage from "./Components/FeedbackPage/FeedbackPage";
import Sessions from "./Components/Sessions/Sessions";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./index.css";
import TermsOfService from "./Components/TermsOfService/TermsOfService";
import PrivacyPolicy from "./Components/PrivacyPolicy/PrivacyPolicy";


// Wrapper Component to render TopBar with Sidebar only on homepage
const ConditionalTopBar = () => {
  const location = useLocation();
  return location.pathname === "/" ? <TopBar /> : null; // Render TopBar only on homepage
};

// Wrapper Component to render Sidebar on all non-homepage routes
const ConditionalSidebar = () => {
  const location = useLocation();
  return location.pathname !== "/" ? <Sidebar /> : null; // Render Sidebar only on non-homepage routes
};

const App = () => {
  return (
    <Router>
      <ConditionalTopBar /> {/* TopBar for homepage */}
      <ConditionalSidebar /> {/* Sidebar for all non-homepage pages */}
      <div className="main-content">
        <Routes>
          {/* Homepage */}
          <Route
            path="/"
            element={
              <>
                <FrontPage />
                <KeyFeatures />
                <HowItWorks />
                <TopMentorsTrendingSession />
                <ExploreTheCommunity />
              </>
            }
          />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/messages" element={<FeedbackPage />} />
          <Route path="/networking-events" element={<NetworkingEvents />} />
          <Route path="/blog-insights" element={<BlogInsights />} />
          <Route path="/case-studies" element={<CaseStudies />} />
          {/* Mentor Registration */}
          <Route path="/mentor-registration" element={<MentorRegistrationForm />} />
        
          {/* Dashboard Routes */}
          <Route path="/dashboard/admin" element={<AdminDashboard />} />
          <Route path="/dashboard/mentor" element={<MentorDashboard />} />
          <Route path="/dashboard/mentee" element={<MenteeDashboard />} />
          <Route path="/Feedback" element={<Feedback />} />
          {/* Mentor Dashboard Features */}
          <Route path="/MentorProfile" element={<MentorProfile />} />
          <Route path="/SessionHistory" element={<SessionHistory />} />
          <Route path="/SessionScheduler" element={<SessionScheduler />} />
          <Route path="/UploadMaterial" element={<UploadMaterials />} />
          <Route path="/ManageQuizzes" element={<ManageQuizzes />} />
          <Route path="/AssignProjects" element={<AssignProjects />} />
          <Route path="/FeedbackReview" element={<FeedbackReview />} />
          {/* Other Routes */}
          <Route path="/upcomingSession" element={<UpcomingSessions />} />
          <Route path="/PerformanceMetrics" element={<PerformanceMetrics />} />
          <Route path="/StudyMaterials" element={<StudyMaterials />} />
          <Route path="/Certificates" element={<Certificates />} />
          <Route path="/TrackMentor" element={<TrackMentors />} />
          <Route path="/TrackMentees" element={<TrackMentees />} />
          <Route path="/UserFeedback" element={<UserFeedback />} />
          <Route path="/DeleteUser" element={<DeleteUser />} />
          <Route path="/ManageSessions" element={<ManageSessions />} />
          <Route path="/AvailSessions" element={<Sessions />} />
          {/* Authentication */}
          <Route path="/Profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/sessions" element={<SessionList />} />
          <Route path="/faqs" element={<FAQs />} />
          <Route path="/Notifications" element={<ViewNotification />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;




            


