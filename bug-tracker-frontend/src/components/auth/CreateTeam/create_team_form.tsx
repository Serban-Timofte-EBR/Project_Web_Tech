import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";

interface CreateTeamFormProps {
  onSubmit: (teamName: string) => void;
}

const CreateTeamForm: React.FC<CreateTeamFormProps> = ({ onSubmit }) => {
  const [teamName, setTeamName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(teamName); // Boiler logic
  };

  return (
    <Box
      sx={{
        backgroundColor: "rgba(255, 255, 255, 0.15)",
        backdropFilter: "blur(10px)",
        borderRadius: 2,
        boxShadow: 3,
        width: "90%",
        maxWidth: 400,
        textAlign: "center",
        padding: 3,
        marginTop: 3,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="h5" sx={{ mb: 2, color: "#fff" }}>
        Create a Team
      </Typography>
      <form onSubmit={handleSubmit} style={{ width: "100%" }}>
        <TextField
          fullWidth
          label="Team Name"
          placeholder="Enter the team name"
          variant="outlined"
          margin="normal"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          InputLabelProps={{
            style: { color: "#fff" },
          }}
          InputProps={{
            style: { color: "#fff" },
          }}
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            borderRadius: 1,
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "transparent",
              },
              "&:hover fieldset": {
                borderColor: "transparent",
              },
              "&.Mui-focused fieldset": {
                borderColor: "transparent",
              },
            },
          }}
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{
            mt: 2,
            backgroundColor: "#6a82fb",
            "&:hover": { backgroundColor: "#5a72eb" },
          }}
        >
          Create Team
        </Button>
      </form>
    </Box>
  );
};

export default CreateTeamForm;
