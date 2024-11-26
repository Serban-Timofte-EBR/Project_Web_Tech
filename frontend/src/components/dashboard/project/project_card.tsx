import React from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
  Divider,
  Box,
  Link
} from "@mui/material";
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
  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "rgba(82, 87, 182, 0.35)",
        borderRadius: 2,
        p: 3,
        mb: 3,
      }}
    >
      {/* Team Name */}
      <Typography
        variant="h5"
        sx={{
          color: "#fff",
          fontWeight: "500",
          mb: 4,
        }}
      >
        {project_team_name}
      </Typography>

      {/* Description Section */}
      <Box sx={{ mb: 3 }}>
        <Typography
          variant="body1"
          sx={{
            color: "#fff",
            opacity: 0.7,
            mb: 1,
          }}
        >
          Description:
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: "#fff",
            opacity: 0.9,
          }}
        >
          {description}
        </Typography>
      </Box>

      {/* Repository Section */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="body1"
          sx={{
            color: "#fff",
            opacity: 0.7,
            mb: 1,
          }}
        >
          Repository:
        </Typography>
        <Link
          href={repo}
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            color: "#fff",
            opacity: 0.9,
            textDecoration: "none",
            "&:hover": {
              textDecoration: "underline",
            },
          }}
        >
          {repo}
        </Link>
      </Box>

      {/* Divider */}
      <Divider
        sx={{
          borderColor: "rgba(255, 255, 255, 0.1)",
          my: 3,
        }}
      />

      {/* Bugs Section */}
      {role === "Tester" && (
        <Box>
          <TestersBugTable teamId={teamId} />
        </Box>
      )}
    </Box>
  );
};

export default ProjectCard;