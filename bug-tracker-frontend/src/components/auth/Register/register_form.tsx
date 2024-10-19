import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../../redux/store";
import { fetchTeams } from "../../../redux/teams/teamsSlice";
import './register_form.css';

interface RegisterFormProps {
  onSubmit: (email: string, password: string, team: string) => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [team, setTeam] = useState("");

  const dispatch: AppDispatch = useDispatch();

  const { teams, loading, error } = useSelector(
    (state: RootState) => state.teams
  );

  useEffect(() => {
    dispatch(fetchTeams());
  }, [dispatch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(email, password, team);
  };

  return (
    <div className="form-background">
      <div className="form-container">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>
          <div className="input-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>
          <div className="input-group teams_label">
            <label>Team:</label>
            {loading ? (
              <p>Fetching available teams...</p>
            ) : error ? (
              <p>Error loading teams: {error}</p>
            ) : (
              <select value={team} onChange={(e) => setTeam(e.target.value)}>
                <option value="">Select a team</option>
                {teams.map((team) => (
                  <option key={team} value={team}>
                    {team}
                  </option>
                ))}
              </select>
            )}
          </div>
          <button type="submit" className="register-button">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
