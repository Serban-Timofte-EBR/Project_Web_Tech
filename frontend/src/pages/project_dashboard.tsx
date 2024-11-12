// This page will be used for testers to see all the projects

import React, { useEffect } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { fetchTeams } from "../redux/teams/teamsSlice";
import ProjectCard from "../components/dashboard/project/project_card";
import MarginUp from "../components/utils/margin_up";

const ProjectDashboard: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { teams, loading, error } = useSelector(
    (state: RootState) => state.teams
  );

  useEffect(() => {
    dispatch(fetchTeams());
  }, [dispatch]);

  return (
    <>
      <MarginUp />
      <Box
        sx={{
          width: "90vw",
          height: "100vh",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",
          padding: "20px 0",
        }}
      >
        {loading && <CircularProgress />}
        {error && (
          <Typography color="error" variant="h6">
            {error}
          </Typography>
        )}
        {!loading && !error && teams.length === 0 && (
          <Typography variant="h6" color="text.secondary">
            No teams available.
          </Typography>
        )}
        {teams.map((team) => (
          <ProjectCard
            key={team.id}
            project_team_name={team.name}
            description={team.description}
            repo={team.repository}
            role="Tester"
          />
        ))}
      </Box>
    </>
  );
};

export default ProjectDashboard;
