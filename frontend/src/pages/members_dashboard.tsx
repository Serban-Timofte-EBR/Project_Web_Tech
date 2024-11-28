import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { fetchTeamById } from "../redux/teams/teamsSlice";
import {
  CircularProgress,
  Typography,
  Box,
  Paper,
  Grid,
  Avatar,
} from "@mui/material";
import { fetchBugs } from "../redux/bugs/bugsSlice";
import TeamMemberBugTable from "../components/dashboard/bugs/team_member_bug_table";
import GroupsIcon from "@mui/icons-material/Groups";

const TeamMemberPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);
  const teamID = user?.teamID;
  const { user_team, loading, error } = useSelector(
    (state: RootState) => state.teams
  );

  useEffect(() => {
    if (teamID) {
      dispatch(fetchBugs(teamID));
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
        bgcolor="#1e293b"
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
        bgcolor="#1e293b"
      >
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  if (!user_team) {
    return null;
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #1e293b 0%, #3b4757 100%)",
        color: "white",
        py: 6,
        px: { xs: 3, md: 6 },
      }}
    >
      {/* Hero Section */}
      <Paper
        elevation={4}
        sx={{
          p: { xs: 4, md: 6 },
          mb: 6,
          mt: 6,
          borderRadius: 5,
          background: "rgba(0, 0, 0, 0.7)",
          backdropFilter: "blur(10px)",
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.5)",
        }}
      >
        <Grid container spacing={4} alignItems="center">
          {/* Team Icon */}
          <Grid item xs={12} md={2}>
            <Avatar
              sx={{
                bgcolor: "#4CAF50",
                width: 96,
                height: 96,
                fontSize: "2.5rem",
                fontWeight: "bold",
              }}
            >
              {user_team.name[0]}
            </Avatar>
          </Grid>
          {/* Team Info */}
          <Grid item xs={12} md={10}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: "bold",
                color: "#f0f0f0",
                mb: 1,
                textAlign: { xs: "center", md: "left" },
              }}
            >
              {user_team.name}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontSize: "1.2rem",
                color: "rgba(255, 255, 255, 0.8)",
                mb: 2,
                textAlign: { xs: "center", md: "left" },
              }}
            >
              {user_team.description}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontSize: "1rem",
                display: "flex",
                alignItems: "center",
                gap: 1,
                color: "#e0e0e0",
                textAlign: { xs: "center", md: "left" },
                justifyContent: { xs: "center", md: "flex-start" },
              }}
            >
              <GroupsIcon fontSize="small" />
              {`${user_team.users.length} ${
                user_team.users.length === 1 ? "Member" : "Members"
              }`}
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      {/* Team Members Section */}
      <Paper
        elevation={3}
        sx={{
          p: { xs: 4, md: 6 },
          mb: 6,
          borderRadius: 5,
          background: "rgba(0, 0, 0, 0.7)",
          backdropFilter: "blur(10px)",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            mb: 4,
            textAlign: "center",
            color: "#00bcd4",
          }}
        >
          Team Members
        </Typography>
        <Grid container spacing={3}>
          {user_team.users.map((user) => (
            <Grid item xs={12} sm={6} md={4} key={user.id}>
              <Box
                sx={{
                  p: 3,
                  background: "rgba(255, 255, 255, 0.1)",
                  borderRadius: 4,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <Avatar
                  sx={{
                    bgcolor: "#00BCD4",
                    mb: 2,
                    width: 64,
                    height: 64,
                  }}
                >
                  {user.email[0].toUpperCase()}
                </Avatar>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    color: "#f0f0f0",
                    fontSize: "1.1rem",
                  }}
                >
                  {user.email}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    mt: 1,
                    color: "rgba(255, 255, 255, 0.7)",
                    fontSize: "0.9rem",
                  }}
                >
                  {user.role === 1 ? "Tester" : "Project Manager"}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Paper>

      {/* Bug Table Section */}
      <Paper
        elevation={3}
        sx={{
          p: { xs: 4, md: 6 },
          borderRadius: 5,
          background: "rgba(0, 0, 0, 0.8)",
          backdropFilter: "blur(10px)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 3,
          }}
        >
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", color: "#00bcd4" }}
          >
            Bugs
          </Typography>
        </Box>
        <TeamMemberBugTable teamId={teamID!} />
      </Paper>
    </Box>
  );
};

export default TeamMemberPage;