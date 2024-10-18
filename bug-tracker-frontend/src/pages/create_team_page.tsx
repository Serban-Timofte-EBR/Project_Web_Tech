import React from 'react';
import CreateTeamForm from '../components/auth/CreateTeam/create_team_form';

const CreateTeamPage: React.FC = () => {
  const handleCreateTeam = (teamName: string) => {
    console.log('Creating team', teamName);
  };

  return (
    <div>
      <h1>Create a Team</h1>
      <CreateTeamForm onSubmit={handleCreateTeam} />
    </div>
  );
};

export default CreateTeamPage;  