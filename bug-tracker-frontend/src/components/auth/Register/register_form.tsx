import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../../redux/store";
import { fetchTeams } from "../../../redux/teams/teamsSlice";

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
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="teams_label">
        <label>Team:</label>
        {loading ? (
          <p>Loading teams...</p>
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
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterForm;
