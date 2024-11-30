import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { fetchBugs, assignBug } from "../../../redux/bugs/bugsSlice";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Typography,
  Button,
  TablePagination,
  Snackbar,
  Alert,
} from "@mui/material";
import LaunchIcon from "@mui/icons-material/Launch";

interface BugTableProps {
  teamId: number;
}

const SEVERITY_CONFIG = {
  low: { color: "#4caf50", label: "Low" },
  medium: { color: "#ff9800", label: "Medium" },
  high: { color: "#f44336", label: "High" },
  critical: { color: "#d32f2f", label: "Critical" },
} as const;

const STATUS_CONFIG = {
  open: { color: "#33b5e5", label: "Open" },
  in_progress: { color: "#ffbb33", label: "In Progress" },
  resolved: { color: "#00C851", label: "Resolved" },
  closed: { color: "#ff4444", label: "Closed" },
} as const;

const TeamMemberBugTable: React.FC<BugTableProps> = ({ teamId }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { bugsByTeam, loading, error } = useSelector(
    (state: RootState) => state.bugs
  );

  const teamBugs = bugsByTeam[teamId] || [];
  const isLoading = loading[teamId];
  const teamError = error[teamId];

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [assignErr, setAssignErr] = useState<string | null>(null);

  useEffect(() => {
    if (assignErr) {
      setOpenSnackbar(true);
    } else {
      setOpenSnackbar(false);
    }
  }, [assignErr]);

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
    setAssignErr(null);
  };

  const handleAssignBug = async (bugId: number) => {
    try {
      await dispatch(assignBug({ bugId })).unwrap();
      dispatch(fetchBugs(teamId));
    } catch (error) {
      setAssignErr("Failed to assign bug. You already have a bug IN PROGRESS.");
    }
  };

  useEffect(() => {
    dispatch(fetchBugs(teamId));
  }, [dispatch, teamId]);

  const renderSeverityChip = (severity: string) => {
    const config = SEVERITY_CONFIG[severity as keyof typeof SEVERITY_CONFIG];
    if (config) {
      return (
        <Chip
          label={config.label}
          sx={{
            backgroundColor: `${config.color}20`,
            color: config.color,
          }}
        />
      );
    }
    return (
      <Chip label="Unknown" sx={{ backgroundColor: "#ccc", color: "#333" }} />
    );
  };

  const renderStatusChip = (status: string) => {
    const config = STATUS_CONFIG[status as keyof typeof STATUS_CONFIG];
    if (config) {
      return (
        <Chip
          label={config.label}
          sx={{
            backgroundColor: `${config.color}20`,
            color: config.color,
          }}
        />
      );
    }
    return (
      <Chip label="Unknown" sx={{ backgroundColor: "#ccc", color: "#333" }} />
    );
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
        <Typography>Loading bugs...</Typography>
      </Box>
    );
  }

  if (teamError) {
    return (
      <Typography color="error" sx={{ textAlign: "center", mt: 2 }}>
        {teamError}
      </Typography>
    );
  }

  if (teamBugs.length === 0) {
    return (
      <Typography sx={{ textAlign: "center", mt: 2 }}>
        No bugs reported for this team.
      </Typography>
    );
  }

  const handleResolveBug = (id: number) => {
    console.log("Resolving bug with ID:", id);
  };

  return (
    <>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="error"
          sx={{
            width: "100%",
            backgroundColor: "#f44336",
            color: "#ffffff",
            fontWeight: "bold",
          }}
        >
          {assignErr}
        </Alert>
      </Snackbar>
      <TableContainer
        component={Paper}
        sx={{
          mt: 3,
          borderRadius: 2,
          backgroundColor: "#1c1c1e",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              {[
                "ID",
                "Severity",
                "Description",
                "Status",
                "Reporter",
                "Assignee",
                "Commit Link",
                "Fix Link",
                "Actions",
              ].map((header) => (
                <TableCell
                  key={header}
                  sx={{
                    fontWeight: "bold",
                    backgroundColor: "#2c2c2e",
                    color: "#ffffff",
                    padding: "10px",
                    textAlign: "center",
                  }}
                >
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {teamBugs
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((bug, index) => (
                <TableRow
                  key={bug.id}
                  sx={{
                    backgroundColor: index % 2 === 0 ? "#2c2c2e" : "#3a3a3c",
                    "&:hover": {
                      backgroundColor: "#444446",
                    },
                  }}
                >
                  <TableCell sx={{ color: "#ffffff" }}>{bug.id}</TableCell>
                  <TableCell sx={{ color: "#ffffff" }}>
                    {renderSeverityChip(bug.severity)}
                  </TableCell>
                  <TableCell sx={{ color: "#ffffff" }}>
                    {bug.description}
                  </TableCell>
                  <TableCell sx={{ color: "#ffffff" }}>
                    {renderStatusChip(bug.status)}
                  </TableCell>
                  <TableCell sx={{ color: "#ffffff" }}>
                    {bug.reporter?.email || "Unknown"}
                  </TableCell>
                  <TableCell sx={{ color: "#ffffff" }}>
                    {bug.assignee?.email || "Unassigned"}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    <a
                      href={bug.commit_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        textDecoration: "none",
                        color: "#1e88e5",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <LaunchIcon
                        sx={{
                          fontSize: "1.5rem",
                          color: "#1e88e5",
                          "&:hover": {
                            color: "#1565c0",
                          },
                        }}
                      />
                    </a>
                  </TableCell>
                  <TableCell
                    sx={{ color: bug.fix_commit_link ? "#43a047" : "#ffffff" }}
                  >
                    {bug.fix_commit_link ? (
                      <a
                        href={bug.fix_commit_link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Fix
                      </a>
                    ) : (
                      "N/A"
                    )}
                  </TableCell>
                  <TableCell>
                    {bug.assignee_id === null ? (
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={() => handleAssignBug(bug.id)}
                        sx={{
                          width: "100%",
                          backgroundColor: "#1e88e5",
                          color: "#ffffff",
                          fontWeight: "bold",
                          padding: "8px 16px",
                          "&:hover": {
                            backgroundColor: "#1565c0",
                          },
                        }}
                      >
                        Assign Me
                      </Button>
                    ) : (
                      <>
                        <Chip
                          label="Assigned"
                          sx={{
                            backgroundColor: "#4caf5020",
                            color: "#4caf50",
                            fontWeight: "bold",
                            display: "block",
                            width: "100%",
                            textAlign: "center",
                            marginBottom: "8px",
                            fontSize: "0.875rem",
                          }}
                        />
                        {bug.status === "in_progress" ? (
                          <Chip
                            label="Resolve"
                            onClick={() => handleResolveBug(bug.id)}
                            clickable
                            sx={{
                              backgroundColor: "#FFB74D20",
                              color: "#FFA726",
                              fontWeight: "bold",
                              width: "100%",
                              textAlign: "center",
                              padding: "8px 16px",
                              fontSize: "0.875rem",
                              borderRadius: "16px",
                              "&:hover": {
                                backgroundColor: "#FFA726",
                                color: "#ffffff",
                                cursor: "pointer",
                              },
                            }}
                          />
                        ) : (
                          // <Typography
                          //   variant="caption"
                          //   sx={{
                          //     color: "#ffffff",
                          //     display: "block",
                          //     textAlign: "center",
                          //     mt: 1,
                          //     fontSize: "0.875rem",
                          //   }}
                          // >
                          //   Can only resolve when in progress
                          // </Typography>
                          null
                        )}
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={teamBugs.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{
            backgroundColor: "#2c2c2e",
            color: "#ffffff",
            ".MuiTablePagination-toolbar": {
              flexDirection: "row",
            },
            ".MuiTablePagination-select": {
              color: "#ffffff",
            },
            ".MuiTablePagination-selectIcon": {
              color: "#ffffff",
            },
            ".MuiTablePagination-displayedRows": {
              color: "#ffffff",
            },
            ".MuiTablePagination-actions button": {
              color: "#ffffff",
            },
          }}
        />
      </TableContainer>
    </>
  );
};

export default TeamMemberBugTable;
