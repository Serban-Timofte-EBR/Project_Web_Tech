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
} from "@mui/material";

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

const severityLevels = ["LOW", "MEDIUM", "HIGH"];

const TestersBugTable: React.FC = () => {
  const [bugs, setBugs] = useState(mockBugs); // To be replaced with Redux state
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
    setBugs(updatedBugs); // To be replaced with Redux action
    handleCloseDialog();
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Bugs
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Severity</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Commit Link</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bugs.map((bug) => (
              <TableRow key={bug.id}>
                <TableCell>{bug.id}</TableCell>
                <TableCell>{bug.severity}</TableCell>
                <TableCell>{bug.description}</TableCell>
                <TableCell>
                  <a
                    href={bug.commit_link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Commit
                  </a>
                </TableCell>
                <TableCell>{bug.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
        onClick={handleOpenDialog}
      >
        Add Bug
      </Button>

      {/* Add Bug Dialog */}
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
          />
          <TextField
            fullWidth
            label="Commit Link"
            name="commit_link"
            value={newBug.commit_link}
            onChange={handleChange}
            margin="normal"
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
