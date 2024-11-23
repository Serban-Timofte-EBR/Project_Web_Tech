import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBugs } from "../../../redux/bugs/bugsSlice";
import { AppDispatch, RootState } from "../../../redux/store";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  CircularProgress,
  Alert,
} from "@mui/material";

interface TestersBugTableProps {
  teamId?: number; 
}

const TestersBugTable: React.FC<TestersBugTableProps> = ({ teamId }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { bugs, loading, error } = useSelector(
    (state: RootState) => state.bugs
  );

  useEffect(() => {
    if (teamId) {
      dispatch(fetchBugs(teamId));
    }
  }, [dispatch, teamId]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" m={2}>
        <CircularProgress size={24} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box m={2}>
        <Alert
          severity="error"
          sx={{ backgroundColor: "rgba(211, 47, 47, 0.1)" }}
        >
          {error}
        </Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 2 }}>
        Reported Bugs
      </Typography>

      <TableContainer
        component={Paper}
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          borderRadius: 2,
          boxShadow: 3,
          overflow: "auto",
          maxHeight: "400px",
        }}
      >
        <Table stickyHeader>
          {" "}
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  color: "#fff",
                  fontWeight: "bold",
                }}
              >
                ID
              </TableCell>
              <TableCell
                sx={{
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  color: "#fff",
                  fontWeight: "bold",
                }}
              >
                Reporter
              </TableCell>
              <TableCell
                sx={{
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  color: "#fff",
                  fontWeight: "bold",
                }}
              >
                Assignee
              </TableCell>
              <TableCell
                sx={{
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  color: "#fff",
                  fontWeight: "bold",
                }}
              >
                Severity
              </TableCell>
              <TableCell
                sx={{
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  color: "#fff",
                  fontWeight: "bold",
                }}
              >
                Description
              </TableCell>
              <TableCell
                sx={{
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  color: "#fff",
                  fontWeight: "bold",
                }}
              >
                Commit Link
              </TableCell>
              <TableCell
                sx={{
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  color: "#fff",
                  fontWeight: "bold",
                }}
              >
                Fix Commit
              </TableCell>
              <TableCell
                sx={{
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  color: "#fff",
                  fontWeight: "bold",
                }}
              >
                Status
              </TableCell>
              <TableCell
                sx={{
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  color: "#fff",
                  fontWeight: "bold",
                }}
              >
                Created
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bugs.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={9}
                  sx={{
                    color: "#fff",
                    textAlign: "center",
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                  }}
                >
                  No bugs reported yet
                </TableCell>
              </TableRow>
            ) : (
              bugs.map((bug) => (
                <TableRow
                  key={bug.id}
                  sx={{
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                    },
                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                  }}
                >
                  <TableCell sx={{ color: "#fff" }}>{bug.id}</TableCell>
                  <TableCell sx={{ color: "#fff" }}>
                    {bug.reporter.email}
                  </TableCell>
                  <TableCell sx={{ color: "#fff" }}>
                    {bug.assignee?.email || "Unassigned"}
                  </TableCell>
                  <TableCell sx={{ color: "#fff" }}>{bug.severity}</TableCell>
                  <TableCell sx={{ color: "#fff" }}>
                    {bug.description}
                  </TableCell>
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
                  <TableCell>
                    {bug.fix_commit_link ? (
                      <a
                        href={bug.fix_commit_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: "#bbdefb", textDecoration: "none" }}
                      >
                        View Fix
                      </a>
                    ) : (
                      "Not fixed"
                    )}
                  </TableCell>
                  <TableCell sx={{ color: "#fff" }}>{bug.status}</TableCell>
                  <TableCell sx={{ color: "#fff" }}>
                    {new Date(bug.createdAt).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TestersBugTable;
