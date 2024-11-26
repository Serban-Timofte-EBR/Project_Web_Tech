import React from "react";
import {
  Box,
  Typography,
  Link,
  Divider,
  Paper,
  Chip,
  Collapse,
  Grid,
} from "@mui/material";
import { Code as CodeIcon } from "lucide-react";
import TestersBugTable from "../bugs/testers_bug_table";

interface ProjectCardProps {
  project_team_name: string;
  description: string;
  repo: string;
  role?: string;
  teamId: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project_team_name,
  description,
  repo,
  role,
  teamId,
}) => {
  const [expanded, setExpanded] = React.useState(true);

  return (
    <Box
      sx={{
        width: "100%",
        overflowX: "auto",
        // Custom scrollbar styling
        "&::-webkit-scrollbar": {
          height: "8px",
        },
        "&::-webkit-scrollbar-track": {
          background: "rgba(255, 255, 255, 0.05)",
          borderRadius: "4px",
        },
        "&::-webkit-scrollbar-thumb": {
          background: "rgba(255, 255, 255, 0.2)",
          borderRadius: "4px",
          "&:hover": {
            background: "rgba(255, 255, 255, 0.3)",
          },
        },
      }}
    >
      <Paper
        elevation={0}
        sx={{
          minWidth: { xs: "100%", md: "800px" }, 
          maxWidth: "100%",
          backgroundColor: "rgba(82, 87, 182, 0.35)",
          borderRadius: { xs: 2, sm: 3 },
          p: { xs: 2, sm: 3 },
          mb: { xs: 2, sm: 3 },
          transition: "all 0.3s ease",
          backdropFilter: "blur(10px)",
          "&:hover": {
            backgroundColor: "rgba(82, 87, 182, 0.4)",
          },
        }}
      >
        <Grid container spacing={3}>
          {/* Header Section */}
          <Grid item xs={12}>
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item xs>
                <Typography
                  variant="h5"
                  sx={{
                    color: "#fff",
                    fontWeight: "500",
                    fontSize: { xs: "1.25rem", sm: "1.5rem" },
                    mb: { xs: 1, sm: 0 },
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {project_team_name}
                </Typography>
              </Grid>
              {role && (
                <Grid item>
                  <Chip
                    label={role}
                    size="small"
                    sx={{
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                      color: "#fff",
                      fontWeight: "500",
                      borderRadius: "16px",
                      ml: 2,
                      flexShrink: 0,
                    }}
                  />
                </Grid>
              )}
            </Grid>
          </Grid>

          {/* Description Section */}
          <Grid item xs={12} md={6}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Typography
                  variant="body1"
                  sx={{
                    color: "#fff",
                    opacity: 0.7,
                    fontSize: { xs: "0.875rem", sm: "1rem" },
                  }}
                >
                  Description:
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography
                  variant="body1"
                  sx={{
                    color: "#fff",
                    opacity: 0.9,
                    fontSize: { xs: "0.875rem", sm: "1rem" },
                    lineHeight: 1.6,
                    minWidth: "300px",
                  }}
                >
                  {description}
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          {/* Repository Section */}
          <Grid item xs={12} md={6}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Typography
                  variant="body1"
                  sx={{
                    color: "#fff",
                    opacity: 0.7,
                    fontSize: { xs: "0.875rem", sm: "1rem" },
                  }}
                >
                  Repository:
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Link
                  href={repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    color: "#fff",
                    opacity: 0.9,
                    textDecoration: "none",
                    fontSize: { xs: "0.875rem", sm: "1rem" },
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    "&:hover": {
                      textDecoration: "underline",
                      opacity: 1,
                    },
                  }}
                >
                  <CodeIcon size={20} style={{ flexShrink: 0 }} />
                  {repo}
                </Link>
              </Grid>
            </Grid>
          </Grid>

          {/* Bugs Section */}
          {role === "Tester" && (
            <Grid item xs={12}>
              <Divider
                sx={{ borderColor: "rgba(255, 255, 255, 0.1)", mb: 3 }}
              />
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Collapse in={expanded}>
                    <TestersBugTable teamId={teamId} />
                  </Collapse>
                </Grid>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Paper>
    </Box>
  );
};

export default ProjectCard;
