import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  MenuItem,
  Typography,
  Paper,
} from "@mui/material";

const severityLevels = ["LOW", "MEDIUM", "HIGH"];

// Mock data for bugs
const mockBugs = [
  {
    id: 1,
    severity: "HIGH",
    description: "Issue with login functionality",
    commit_link: "https://github.com/repo/commit/abc123",
    status: "OPEN",
  },
  {
    id: 2,
    severity: "LOW",
    description: "UI misalignment on dashboard",
    commit_link: "https://github.com/repo/commit/xyz456",
    status: "OPEN",
  },
];

const TestersBugTable: React.FC = () => {
  const [bugs, setBugs] = useState(mockBugs); // Replace with Redux state in the future
  const [openDialog, setOpenDialog] = useState(false);
  const [newBug, setNewBug] = useState({
    severity: "",
    description: "",
    commit_link: "",
  });

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setNewBug({ severity: "", description: "", commit_link: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewBug({ ...newBug, [name]: value });
  };

  const handleAddBug = () => {
    const updatedBugs = [
      ...bugs,
      {
        id: bugs.length + 1,
        ...newBug,
        status: "OPEN",
      },
    ];
    setBugs(updatedBugs); // Replace with Redux action in the future
    handleCloseDialog();
  };

  return (
    <Box sx={{ marginTop: 2, color: "#fff" }}>
      <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 2 }}>
        Reported Bugs
      </Typography>

      <TableContainer
        component={Paper}
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          borderRadius: 2,
          boxShadow: 3,
          overflow: "hidden",
        }}
      >
        <Table>
          <TableHead sx={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}>
            <TableRow>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>ID</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                Severity
              </TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                Description
              </TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                Commit Link
              </TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                Status
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bugs.map((bug) => (
              <TableRow
                key={bug.id}
                sx={{
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                  },
                }}
              >
                <TableCell sx={{ color: "#fff" }}>{bug.id}</TableCell>
                <TableCell sx={{ color: "#fff" }}>{bug.severity}</TableCell>
                <TableCell sx={{ color: "#fff" }}>{bug.description}</TableCell>
                <TableCell>
                  <a
                    href={bug.commit_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "#bbdefb", textDecoration: "none" }}
                  >
                    View Commit
                  </a>
                </TableCell>
                <TableCell sx={{ color: "#fff" }}>{bug.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Button
        variant="contained"
        sx={{
          marginTop: 3,
          backgroundColor: "#6a82fb",
          "&:hover": {
            backgroundColor: "#5a72eb",
          },
        }}
        onClick={handleOpenDialog}
      >
        Report a Bug
      </Button>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Add New Bug</DialogTitle>
        <DialogContent>
          <TextField
            select
            fullWidth
            label="Severity"
            name="severity"
            value={newBug.severity}
            onChange={handleChange}
            margin="normal"
            sx={{ marginBottom: 2 }}
          >
            {severityLevels.map((level) => (
              <MenuItem key={level} value={level}>
                {level}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            fullWidth
            label="Description"
            name="description"
            value={newBug.description}
            onChange={handleChange}
            margin="normal"
            multiline
            rows={3}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            fullWidth
            label="Commit Link"
            name="commit_link"
            value={newBug.commit_link}
            onChange={handleChange}
            margin="normal"
            sx={{ marginBottom: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={handleAddBug}
            color="primary"
            disabled={
              !newBug.severity || !newBug.description || !newBug.commit_link
            }
          >
            Add Bug
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TestersBugTable; 