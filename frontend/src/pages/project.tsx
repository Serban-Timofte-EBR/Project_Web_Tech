import React, { useEffect } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../redux/store";
import ProjectCard from "../components/dashboard/project/project_card";
import MarginUp from "../components/utils/margin_up";
import { fetchTeams } from "../redux/teams/teamsSlice"; 

const ProjectPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { teamId } = useParams<{ teamId: string }>();

  const { teams, loading, error } = useSelector(
    (state: RootState) => state.teams
  );

  useEffect(() => {
    dispatch(fetchTeams());
  }, [dispatch]);

  const team = teams.find((t) => t.id === Number(teamId));

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Typography color="error" variant="h6">
          {error}
        </Typography>
      </Box>
    );
  }

  if (!team) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Typography variant="h6" color="text.secondary">
          Team not found
        </Typography>
      </Box>
    );
  }

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
        <ProjectCard
          project_team_name={team.name}
          description={team.description}
          repo={team.repository}
          role="Team Member"
          teamId={team.id}
        />
      </Box>
    </>
  );
};

export default ProjectPage;
