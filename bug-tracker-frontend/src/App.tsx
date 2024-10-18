import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/login_page";
import RegisterPage from "./pages/register_page";
import CreateTeamPage from "./pages/create_team_page";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" Component={LoginPage} />
        <Route path="/create-user-account" Component={RegisterPage} />
        <Route path="/create-team" Component={CreateTeamPage} />
      </Routes>
    </Router>
  );
};

export default App;
