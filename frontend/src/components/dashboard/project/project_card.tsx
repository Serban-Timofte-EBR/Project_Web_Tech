import React from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
  Divider,
  Box,
} from "@mui/material";

interface ProjectCardProps {
  project_team_name: string;
  description: string;
  repo: string;
  role?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project_team_name,
  description,
  repo,
  role,
}) => {
  return (
    <Card
      sx={{
        width: "100%",
        minHeight: 300,
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        backdropFilter: "blur(10px)",
        color: "#fff",
        borderRadius: 2,
        boxShadow: 3,
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        marginBottom: "20px",
      }}
    >
      <CardContent>
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          {project_team_name}
        </Typography>
        <Divider
          sx={{
            marginTop: 1,
            marginBottom: 2,
            backgroundColor: "rgba(255, 255, 255, 0.5)",
          }}
        />

        <Box sx={{ marginBottom: 2 }}>
          <Typography variant="body1" sx={{ fontWeight: "medium", mb: 1 }}>
            Description:
          </Typography>
          <Typography variant="body2" sx={{ color: "#ccc" }}>
            {description}
          </Typography>
        </Box>

        <Box>
          <Typography variant="body1" sx={{ fontWeight: "medium", mb: 1 }}>
            Repository:
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "#bbdefb",
              wordWrap: "break-word", 
            }}
          >
            <a
              href={repo}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#bbdefb" }}
            >
              {repo}
            </a>
          </Typography>
        </Box>
      </CardContent>

      <Divider
        sx={{
          marginY: 2,
          backgroundColor: "rgba(255, 255, 255, 0.5)",
        }}
      />

      <CardActions sx={{ justifyContent: "flex-start" }}>
        {role === "Team Member" && (
          <Button variant="contained" size="small" color="primary">
            Edit Project
          </Button>
        )}
        {role === "Tester" && (
          <Button variant="contained" size="small" color="primary">
            Add Bug
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default ProjectCard;
