import React, { useState } from "react";

interface CreateTeamFormProps {
  onSubmit: (teamName: string) => void;
}

const CreateTeamForm: React.FC<CreateTeamFormProps> = ({ onSubmit }) => {
  const [teamName, setTeamName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(teamName); // Boiler logic
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Team Name:</label>
        <input
          type="text"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
        />
      </div>
      <button type="submit">Create Team</button>
    </form>
  );
};

export default CreateTeamForm;
