// This page will be used for testers to see all the projects

import React from "react";
import { Box } from "@mui/material";
import ProjectCard from "../components/dashboard/project/project_card";
import MarginUp from "../components/utils/margin_up";

const ProjectDashboard: React.FC = () => {
  console.log("Testers Page")
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
          project_team_name="Project Team Name"
          description="Project Description"
          repo="Repo Here"
          role="Tester"
        />
        <ProjectCard
          project_team_name="Project Team Name"
          description="Project Description"
          repo="Repo Here"
          role="Tester"
        />
        <ProjectCard
          project_team_name="Project Team Name"
          description="Project Description"
          repo="Repo Here"
          role="Tester"
        />
        <ProjectCard
          project_team_name="Project Team Name"
          description="Project Description"
          repo="Repo Here"
          role="Tester"
        />
        <ProjectCard
          project_team_name="Project Team Name"
          description="Project Description"
          repo="Repo Here"
          role="Tester"
        />
        <ProjectCard
          project_team_name="Project Team Name"
          description="Project Description"
          repo="Repo Here"
          role="Tester"
        />
        <ProjectCard
          project_team_name="Project Team Name"
          description="Project Description"
          repo="Repo Here"
          role="Tester"
        />
        <ProjectCard
          project_team_name="Project Team Name"
          description="Project Description"
          repo="Repo Here"
          role="Tester"
        />
        <ProjectCard
          project_team_name="Project Team Name"
          description="Project Description"
          repo="Repo Here"
          role="Tester"
        />
        <ProjectCard
          project_team_name="Project Team Name"
          description="Project Description"
          repo="Repo Here"
          role="Tester"
        />
      </Box>
    </>
  );
};

export default ProjectDashboard;
