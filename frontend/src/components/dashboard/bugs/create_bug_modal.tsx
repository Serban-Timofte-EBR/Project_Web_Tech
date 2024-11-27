import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  MenuItem,
  Button,
  Grid,
} from "@mui/material";

interface CreateBugModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: {
    team_id: number;
    severity: string;
    description: string;
    commit_link: string;
  }) => void;
  teamId: number; 
}

const bugSeverityOptions = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
  { value: "critical", label: "Critical" },
];

const CreateBugModal: React.FC<CreateBugModalProps> = ({
  open,
  onClose,
  onSubmit,
  teamId,
}) => {
  const [severity, setSeverity] = useState<string>("medium");
  const [description, setDescription] = useState<string>("");
  const [commitLink, setCommitLink] = useState<string>("");

  const handleSubmit = () => {
    onSubmit({
      team_id: teamId,
      severity,
      description,
      commit_link: commitLink,
    });
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="create-bug-modal">
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "90%", sm: "500px" },
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography
          id="create-bug-modal"
          variant="h6"
          component="h2"
          sx={{ mb: 2, textAlign: "center", fontWeight: "bold" }}
        >
          Create a New Bug
        </Typography>

        <Grid container spacing={2}>
          {/* Severity Dropdown */}
          <Grid item xs={12}>
            <TextField
              select
              fullWidth
              label="Severity"
              value={severity}
              onChange={(e) => setSeverity(e.target.value)}
            >
              {bugSeverityOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          {/* Description Field */}
          <Grid item xs={12}>
            <TextField
              label="Description"
              fullWidth
              multiline
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter a detailed description of the bug"
            />
          </Grid>

          {/* Commit Link Field */}
          <Grid item xs={12}>
            <TextField
              label="Commit Link"
              fullWidth
              value={commitLink}
              onChange={(e) => setCommitLink(e.target.value)}
              placeholder="Enter the GitHub commit link"
            />
          </Grid>
        </Grid>

        <Box sx={{ mt: 3, display: "flex", justifyContent: "space-between" }}>
          <Button
            variant="outlined"
            color="secondary"
            onClick={onClose}
            sx={{ textTransform: "capitalize" }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={!severity || !description || !commitLink}
            sx={{
              textTransform: "capitalize",
              bgcolor: "#00bcd4",
              "&:hover": { bgcolor: "#0199a4" },
            }}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default CreateBugModal;
