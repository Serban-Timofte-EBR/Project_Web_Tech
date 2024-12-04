import React, {useEffect, useState} from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Paper,
  Divider,
  Button,
  Tooltip,
  IconButton,
  Grid,
  Avatar,
} from "@mui/material";
import {fetchTeamById, Team} from "../redux/teams/teamsSlice";
import { GitHub, ArrowBack } from "@mui/icons-material";
import TestersBugTable from "../components/dashboard/bugs/testers_bug_table";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../redux/store";

const TeamPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

    const { teamId } = useParams<{ teamId: string }>();
    const [team, setTeam] = useState<Team | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadTeam = async () => {
            try {
                const fetchedTeam = await dispatch(fetchTeamById(Number(teamId))).unwrap();
                setTeam(fetchedTeam);
            } catch (error) {
                setError("Failed to load team");
            } finally {
                setLoading(false);
            }
        };

        loadTeam();
    }, [dispatch, teamId]);

  const handleBack = () => {
    navigate(-1);
  };

  if (!team) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background:
            "linear-gradient(135deg, rgb(24, 28, 40) 0%, rgb(32, 36, 48) 100%)",
          color: "white",
        }}
      >
        <Typography color="error" variant="h5">
          Team not found.
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
        py: 6,
        px: { xs: 2, sm: 4, md: 6 },
      }}
    >
      {/* Back Button */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          mb: 4,
          px: { xs: 2, sm: 4 },
        }}
      >
        <Button
          startIcon={<ArrowBack />}
          onClick={handleBack}
          sx={{
            color: "white",
            background: "linear-gradient(135deg, #00bcd4, #2196f3)",
            borderRadius: "30px",
            px: 3,
            py: 1,
            fontSize: "0.875rem",
            fontWeight: 600,
            textTransform: "capitalize",
            boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
            transition: "all 0.3s ease",
            marginTop: "15px",
            "&:hover": {
              background: "linear-gradient(135deg, #0199a4, #1777c2)",
              transform: "translateY(-2px)",
              boxShadow: "0 6px 12px rgba(0,0,0,0.3)",
            },
          }}
        >
          Back
        </Button>
      </Box>

      {/* Team Details Section */}
      <Paper
        elevation={3}
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.08)",
          borderRadius: 3,
          p: { xs: 3, sm: 4, md: 6 },
          backdropFilter: "blur(10px)",
          color: "white",
        }}
      >
        <Grid container spacing={4}>
          {/* Left Section: Team Details */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                mb: 2,
                flexWrap: "wrap",
              }}
            >
              <Avatar
                sx={{
                  bgcolor: "#00bcd4",
                  color: "white",
                  width: { xs: 56, md: 64 },
                  height: { xs: 56, md: 64 },
                  fontSize: "1.5rem",
                  fontWeight: 700,
                }}
              >
                {team.name[0]}
              </Avatar>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  fontSize: { xs: "1.5rem", md: "2rem" },
                  color: "white",
                }}
              >
                {team.name}
              </Typography>
            </Box>
            <Typography
              variant="body1"
              sx={{
                color: "rgba(255, 255, 255, 0.7)",
                fontSize: "1rem",
                lineHeight: 1.7,
                mb: 3,
              }}
            >
              {team.description}
            </Typography>
            <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.2)", mb: 3 }} />
            <Typography
              variant="body2"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                color: "rgba(255, 255, 255, 0.8)",
                wordBreak: "break-word",
              }}
            >
              Repository:
              <Tooltip title="View Repository" placement="top">
                <IconButton
                  size="small"
                  onClick={() => window.open(team.repository, "_blank")}
                  sx={{
                    color: "white",
                  }}
                >
                  <GitHub fontSize="small" />
                </IconButton>
              </Tooltip>
            </Typography>
          </Grid>

          {/* Right Section: List of Users */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              justifyContent: "center",
            }}
          >
            <Paper
              elevation={2}
              sx={{
                p: 3,
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                borderRadius: 3,
                textAlign: "center",
                color: "white",
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 600,
                  color: "#00bcd4",
                  mb: 2,
                }}
              >
                Team Members
              </Typography>
              {team.users && team.users.length > 0 ? (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                    alignItems: "center",
                  }}
                >
                  {team.users.map((user) => (
                    <Paper
                      key={user.id}
                      elevation={1}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        p: 2,
                        backgroundColor: "rgba(255, 255, 255, 0.08)",
                        borderRadius: 2,
                        width: "100%",
                        maxWidth: "300px",
                      }}
                    >
                      <Avatar
                        sx={{
                          bgcolor: user.role === 1 ? "#00bcd4" : "#2196f3",
                          color: "white",
                        }}
                      >
                        {user.email[0].toUpperCase()}
                      </Avatar>
                      <Box sx={{ flex: 1 }}>
                        <Typography
                          variant="body1"
                          sx={{ fontWeight: 600, color: "#fff" }}
                        >
                          {user.email}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: "rgba(255, 255, 255, 0.7)",
                            fontSize: "0.875rem",
                          }}
                        >
                          {user.role === 1 ? "Tester" : "Other Role"}
                        </Typography>
                      </Box>
                    </Paper>
                  ))}
                </Box>
              ) : (
                <Typography
                  variant="body1"
                  sx={{ fontSize: "1rem", color: "rgba(255, 255, 255, 0.7)" }}
                >
                  No users assigned to this team.
                </Typography>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Paper>

      {/* Bug Table Section */}
      <Box sx={{ mt: 6 }}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            mb: 3,
            color: "#00bcd4",
            textAlign: "center",
          }}
        >
          Reported Bugs
        </Typography>
        <TestersBugTable teamId={team.id} />
      </Box>
    </Box>
  );
};

export default TeamPage;
