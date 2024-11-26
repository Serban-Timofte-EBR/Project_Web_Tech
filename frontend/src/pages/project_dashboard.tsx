import React, { useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  Typography,
  Container,
  Grid,
  Fade,
  Alert,
  AlertTitle,
  Skeleton,
  Divider,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { fetchTeams } from "../redux/teams/teamsSlice";
import ProjectCard from "../components/dashboard/project/project_card";
import MarginUp from "../components/utils/margin_up"

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
      <MarginUp /> {/* Add this back */}
      <Box
        sx={{
          width: "100%",
          minHeight: "100vh",
          backgroundColor: "rgb(59, 63, 146)",
          px: { xs: 2, sm: 3, md: 4 },
        }}
      >
        <Box sx={{ maxWidth: "1800px", mx: "auto" }}>
          {loading && (
            <Box display="flex" justifyContent="center">
              <CircularProgress />
            </Box>
          )}
          
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
          
          <Box>
            {teams.map((team) => (
              <ProjectCard
                key={team.id}
                project_team_name={team.name}
                description={team.description}
                repo={team.repository}
                role="Tester"
                teamId={team.id}
              />
            ))}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ProjectDashboard;