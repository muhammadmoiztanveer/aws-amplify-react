import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/login/login";
import AdminSignupPage from "./pages/adminSignUp/adminSignup";
import LocalUserSignupPage from "./pages/localUserSignUp/localUserSignUp";
import ForgotPasswordPage from "./pages/forgotPassword/forgotPassword";
import UploadPage from "./pages/upload/upload";
import AnalyticsPage from "./pages/analytics/analytics";
import RegistrationVerification from "./pages/registrationVerification/registrationVerification";
import Layout from "./pages/layout/layout";
import UsersPage from "./pages/users/users";
import TaskManagerPage from "./pages/taskManager/taskManager"
import StatusPage from "./pages/status/status"
import "./index.css";
import { withAuthenticator, Button, Heading } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";


const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/setup" element={<AdminSignupPage />} />
          <Route path="/signup" element={<LocalUserSignupPage />} />
          <Route
            path="/verify-registration-otp"
            element={<RegistrationVerification />}
          />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />

          <Route path="/" element={<Layout />}>
            <Route path="users" element={<UsersPage />} />
            <Route path="status" element={<StatusPage />} />
            <Route path="task-manager" element={<TaskManagerPage />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
