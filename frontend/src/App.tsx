import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import LoginPage from "./pages/login_page";
import RegisterPage from "./pages/register_page";
import { useAuth } from "./hooks/useAuth";
import TeamSelectionPage from "./pages/testers_dashboard";
import TeamPage from "./pages/team_page";
import TeamMemberPage from "./pages/members_dashboard";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" Component={LoginPage} />
        <Route path="/create-user-account" Component={RegisterPage} />
        <Route 
          path="/members-dashboard"
          element={
            <ProtectedRoute>
              <TeamMemberPage />
            </ProtectedRoute>
          } />
        <Route
          path="/testers-dashboard"
          element={
            <ProtectedRoute>
              <TeamSelectionPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/testers-dashboard/team/:teamId"
          element={
            <ProtectedRoute>
              <TeamPage />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
