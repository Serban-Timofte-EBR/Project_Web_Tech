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
} from "@mui/material";

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

  const handleAssignBug = async (bugId: number) => {
    try {
      await dispatch(assignBug({ bugId })).unwrap();
      dispatch(fetchBugs(teamId));
    } catch (error) {
      console.error("Failed to assign bug:", error);
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

  return (
    <TableContainer
      component={Paper}
      sx={{
        mt: 3,
        borderRadius: 2,
        backgroundColor: "#1c1c1e", // Dark background
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)", // Subtle shadow
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
                <TableCell sx={{ color: "#1e88e5" }}>
                  <a
                    href={bug.commit_link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Commit
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
                      variant="outlined"
                      color="primary"
                      size="small"
                      onClick={() => handleAssignBug(bug.id)}
                    >
                      Assign Me
                    </Button>
                  ) : (
                    <Chip
                      label="Assigned"
                      sx={{
                        backgroundColor: "#4caf5020",
                        color: "#4caf50",
                      }}
                    />
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
  );
};

export default TeamMemberBugTable;
