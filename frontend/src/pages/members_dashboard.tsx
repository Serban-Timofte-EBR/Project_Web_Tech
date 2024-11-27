import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { fetchTeamById } from "../redux/teams/teamsSlice";
import { CircularProgress, Typography, Box, Paper } from "@mui/material";

const TeamMemberPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);
  const teamID = user?.teamID;
  const { user_team, loading, error } = useSelector(
    (state: RootState) => state.teams
  );
  console.log(user_team);

  useEffect(() => {
    if (teamID) {
      dispatch(fetchTeamById(teamID));
    }
  }, [dispatch, teamID]);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
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
        minHeight="100vh"
      >
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  if (!user_team) {
    return null;
  }

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 600, margin: "auto", mt: 4 }}>
      <Typography variant="h4">{user_team.name}</Typography>
      <Typography variant="body1" sx={{ mt: 2 }}>
        {user_team.description}
      </Typography>
      {user_team.users.map((user) => (
        <Box key={user.id} sx = {{mt: 2}}>
          <Typography variant="h6">{user.email}</Typography>
          <Typography variant="body1">{user.role === 1 ? "Member" : "Tester"}</Typography>
        </Box>
      ))}
    </Paper>
  );
};

export default TeamMemberPage;
