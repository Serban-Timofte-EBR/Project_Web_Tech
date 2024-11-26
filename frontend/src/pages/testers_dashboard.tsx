import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CardActionArea,
  CircularProgress,
  Grid,
  Button,
  Tooltip,
  IconButton,
  Paper,
  Avatar,
  Divider,
  Chip,
} from "@mui/material";
import { GitHub } from "@mui/icons-material";
import { fetchTeams } from "../redux/teams/teamsSlice";

export interface Team {
  id: number;
  name: string;
  description: string;
  repository: string;
}

const TeamSelectionPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { teams, loading, error } = useSelector(
    (state: RootState) => state.teams
  );
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);

  useEffect(() => {
    dispatch(fetchTeams());
  }, [dispatch]);

  const handleTeamSelect = (team: Team) => {
    setSelectedTeam(team);
  };

  const handleProceed = () => {
    if (selectedTeam) {
      navigate(`/testers-dashboard/team/${selectedTeam.id}`);
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background:
            "linear-gradient(135deg, rgb(24, 28, 40) 0%, rgb(32, 36, 48) 100%)",
        }}
      >
        <CircularProgress size={80} sx={{ color: "#00bcd4" }} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background:
            "linear-gradient(135deg, rgb(24, 28, 40) 0%, rgb(32, 36, 48) 100%)",
        }}
      >
        <Typography color="error" variant="h5">
          Failed to load teams: {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, rgb(24, 28, 40) 0%, rgb(32, 36, 48) 100%)",
        color: "white",
        py: 6,
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          sx={{
            textAlign: "center",
            mb: 6,
            fontWeight: 700,
            marginTop: "2rem",
            fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
            color: "#00bcd4",
            textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
          }}
        >
          Explore and Select Your Team
        </Typography>
        <Grid container spacing={4}>
          {teams.map((team) => (
            <Grid item xs={12} sm={6} md={4} key={team.id}>
              <Card
                sx={{
                  backgroundColor:
                    selectedTeam?.id === team.id
                      ? "rgba(0, 188, 212, 0.1)"
                      : "rgba(255, 255, 255, 0.05)",
                  border:
                    selectedTeam?.id === team.id
                      ? "2px solid #00bcd4"
                      : "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: "16px",
                  boxShadow: "0px 4px 10px rgba(0,0,0,0.3)",
                  transition: "transform 0.3s, box-shadow 0.3s",
                  cursor: "pointer",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0px 8px 20px rgba(0,0,0,0.4)",
                  },
                }}
                onClick={() => handleTeamSelect(team)}
              >
                <CardActionArea
                  sx={{
                    padding: "20px",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Avatar
                      sx={{
                        bgcolor: "#00bcd4",
                        color: "white",
                        fontSize: "16px",
                        width: 40,
                        height: 40,
                      }}
                    >
                      {team.name[0]}
                    </Avatar>
                    <Tooltip title="View Repository" placement="top">
                      <IconButton
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(team.repository, "_blank");
                        }}
                        sx={{
                          color: "white",
                          padding: "4px",
                          "&:hover": {
                            color: "#00bcd4",
                          },
                        }}
                      >
                        <GitHub fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 600,
                      mt: 2,
                      fontSize: "1.25rem",
                      textAlign: "center",
                    }}
                  >
                    {team.name}
                  </Typography>
                  <Divider
                    sx={{
                      mt: 2,
                      mb: 2,
                      bgcolor: "rgba(255, 255, 255, 0.1)",
                    }}
                  />
                  <Typography
                    variant="body2"
                    sx={{
                      color: "rgba(255, 255, 255, 0.7)",
                      textAlign: "center",
                      height: "60px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {team.description}
                  </Typography>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>

        {selectedTeam && (
          <Paper
            elevation={3}
            sx={{
              mt: 6,
              p: 4,
              backgroundColor: "rgba(255, 255, 255, 0.08)",
              backdropFilter: "blur(20px)",
              color: "white",
              borderRadius: "16px",
              border: "2px solid #00bcd4",
              textAlign: "center",
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
              Selected Team: {selectedTeam.name}
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Description:</strong> {selectedTeam.description}
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Repository:</strong>{" "}
              <a
                href={selectedTeam.repository}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "#00bcd4",
                  textDecoration: "underline",
                  wordBreak: "break-word",
                }}
              >
                {selectedTeam.repository}
              </a>
            </Typography>
            <Button
              variant="contained"
              onClick={handleProceed}
              sx={{
                mt: 2,
                px: 4,
                py: 1,
                fontSize: "1rem",
                backgroundColor: "#00bcd4",
                color: "white",
                borderRadius: "8px",
                "&:hover": {
                  backgroundColor: "#0199a4",
                },
              }}
            >
              Proceed to Team Page
            </Button>
          </Paper>
        )}
      </Container>
    </Box>
  );
};

export default TeamSelectionPage;
