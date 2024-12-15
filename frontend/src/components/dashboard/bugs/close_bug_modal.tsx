import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Grid,
} from "@mui/material";

interface CloseBugModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: { resolution_link: string }) => void;
}

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

const CloseBugModal: React.FC<CloseBugModalProps> = ({
  open,
  onClose,
  onSubmit,
}) => {
  const [resolutionLink, setResolutionLink] = useState<string>("");
  const [urlError, setUrlError] = useState<string | null>(null);

  const handleResolutionLinkChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setResolutionLink(value);

    if (!isValidURL(value)) {
      setUrlError("Please enter a valid URL.");
    } else {
      setUrlError(null);
    }
  };

  const handleSubmit = () => {
    if (!urlError && resolutionLink) {
      onSubmit({ resolution_link: resolutionLink });
      onClose();
    }
  };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="close-bug-modal">
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
          id="close-bug-modal"
          variant="h6"
          component="h2"
          sx={{
            mb: 2,
            textAlign: "center",
            fontWeight: "bold",
            color: "#00bcd4",
          }}
        >
          Resolve Bug
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Resolution Link"
              fullWidth
              value={resolutionLink}
              onChange={handleResolutionLinkChange}
              placeholder="Enter the GitHub link with the resolution"
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
            disabled={!resolutionLink || !!urlError}
            sx={{
              textTransform: "capitalize",
              bgcolor: "#00bcd4",
              "&:hover": { bgcolor: "#0199a4" },
            }}
          >
            Resolve
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default CloseBugModal;