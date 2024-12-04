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

const isValidURL = (url: string): boolean => {
  try {
    const parsedURL = new URL(url);
    if (
      parsedURL.hostname === "localhost" ||
      parsedURL.hostname.includes("127.0.0.1")
    ) {
      return false;
    }
    return true;
  } catch (_) {
    return false;
  }
};

const CreateBugModal: React.FC<CreateBugModalProps> = ({
  open,
  onClose,
  onSubmit,
  teamId,
}) => {
  const [severity, setSeverity] = useState<string>("medium");
  const [description, setDescription] = useState<string>("");
  const [commitLink, setCommitLink] = useState<string>("");
  const [urlError, setUrlError] = useState<string | null>(null);

  const handleCommitLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCommitLink(value);

    if (!isValidURL(value)) {
      setUrlError("Please enter a valid URL.");
    } else {
      setUrlError(null);
    }
  };

  const handleSubmit = () => {
    if (!urlError) {
      onSubmit({
        team_id: teamId,
        severity,
        description,
        commit_link: commitLink,
      });
      onClose();
    }
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
          bgcolor: "rgba(30, 41, 59, 0.95)",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          color: "white",
          backdropFilter: "blur(8px)",
        }}
      >
        <Typography
          id="create-bug-modal"
          variant="h6"
          component="h2"
          sx={{
            mb: 2,
            textAlign: "center",
            fontWeight: "bold",
            color: "#00bcd4",
          }}
        >
          Create a New Bug
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              select
              fullWidth
              label="Severity"
              value={severity}
              onChange={(e) => setSeverity(e.target.value)}
              sx={{
                bgcolor: "rgba(255, 255, 255, 0.1)",
                borderRadius: 1,
                input: { color: "white" },
                "& .MuiInputLabel-root": { color: "#00bcd4" },
                "& .MuiInputBase-input": { color: "white" },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#00bcd4",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#0199a4",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#00bcd4",
                },
              }}
            >
              {bugSeverityOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Description"
              fullWidth
              multiline
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter a detailed description of the bug"
              sx={{
                bgcolor: "rgba(255, 255, 255, 0.1)",
                borderRadius: 1,
                input: { color: "white" },
                "& .MuiInputLabel-root": { color: "#00bcd4" },
                "& .MuiInputBase-input": { color: "white" },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#00bcd4",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#0199a4",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#00bcd4",
                },
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Commit Link"
              fullWidth
              value={commitLink}
              onChange={handleCommitLinkChange}
              placeholder="Enter the GitHub commit link"
              error={!!urlError}
              helperText={urlError}
              sx={{
                bgcolor: "rgba(255, 255, 255, 0.1)",
                borderRadius: 1,
                input: { color: "white" },
                "& .MuiInputLabel-root": { color: "#00bcd4" },
                "& .MuiInputBase-input": { color: "white" },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#00bcd4",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#0199a4",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#00bcd4",
                },
              }}
            />
          </Grid>
        </Grid>

        <Box sx={{ mt: 3, display: "flex", justifyContent: "space-between" }}>
          <Button
            variant="outlined"
            color="secondary"
            onClick={onClose}
            sx={{
              textTransform: "capitalize",
              color: "#ff7043",
              borderColor: "#ff7043",
              "&:hover": {
                color: "white",
                borderColor: "#ff7043",
                backgroundColor: "#ff7043",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={!severity || !description || !commitLink || !!urlError}
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
