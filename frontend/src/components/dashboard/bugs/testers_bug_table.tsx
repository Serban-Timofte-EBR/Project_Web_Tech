import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBugs, createBug } from "../../../redux/bugs/bugsSlice";
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
  Chip,
  IconButton,
  Tooltip,
  TablePagination,
} from "@mui/material";
import {
  OpenInNew as OpenInNewIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  Warning as WarningIcon,
  Info as InfoIcon,
  Add as AddIcon,
} from "@mui/icons-material";
import CreateBugModal from "./create_bug_modal";

interface TestersBugTableProps {
  teamId?: number;
}

const SEVERITY_CONFIG = {
  high: { color: "#ff4444", icon: ErrorIcon, label: "High" },
  medium: { color: "#ffbb33", icon: WarningIcon, label: "Medium" },
  low: { color: "#00C851", icon: InfoIcon, label: "Low" },
  critical: { color: "#d32f2f", icon: ErrorIcon, label: "Critical" },
} as const;

const STATUS_CONFIG = {
  open: { color: "#33b5e5", label: "Open" },
  "in-progress": { color: "#ffbb33", label: "In Progress" },
  resolved: { color: "#00C851", label: "Resolved" },
  closed: { color: "#ff4444", label: "Closed" },
} as const;

const TestersBugTable: React.FC<TestersBugTableProps> = ({ teamId }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { bugsByTeam, loading, error } = useSelector(
    (state: RootState) => state.bugs
  );
  const reporterID = useSelector((state: RootState) => state.auth.user?.id);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  const teamBugs = useMemo(
    () => (teamId ? bugsByTeam[teamId] || [] : []),
    [teamId, bugsByTeam]
  );
  console.log(teamBugs);
  const isLoading = teamId ? loading[teamId] : false;
  const teamError = teamId ? error[teamId] : null;

  useEffect(() => {
    if (teamId && !bugsByTeam[teamId]) {
      dispatch(fetchBugs(teamId));
    }
  }, [dispatch, teamId, bugsByTeam]);

  const handleCreateBug = async (newBug: {
    team_id: number;
    severity: string;
    description: string;
    commit_link: string;
  }) => {
    const bugPayload = {
      ...newBug,
      reporter_id: reporterID || 0,
      assignee_id: null,
      status: "open",
      fix_commit_link: null,
    };
    
    const result = await dispatch(createBug(bugPayload));

    if (createBug.fulfilled.match(result)) {
      dispatch(fetchBugs(teamId as number));
    } else {
      console.error("Failed to create bug");
    }
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

  const renderSeverityChip = (severity: keyof typeof SEVERITY_CONFIG) => {
    const config = SEVERITY_CONFIG[severity];
    const Icon = config.icon;
    return (
      <Chip
        icon={<Icon sx={{ fill: config.color }} />}
        label={config.label}
        size="small"
        sx={{
          backgroundColor: `${config.color}20`,
          color: config.color,
          fontWeight: "medium",
        }}
      />
    );
  };

  const renderStatusChip = (status: keyof typeof STATUS_CONFIG) => {
    const config = STATUS_CONFIG[status];
    return (
      <Chip
        label={config.label}
        size="small"
        sx={{
          backgroundColor: `${config.color}20`,
          color: config.color,
          fontWeight: "medium",
        }}
      />
    );
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" m={2}>
        <CircularProgress size={24} />
      </Box>
    );
  }

  if (teamError) {
    return (
      <Box m={2}>
        <Alert
          severity="error"
          sx={{ backgroundColor: "rgba(211, 47, 47, 0.1)" }}
        >
          {teamError}
        </Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ width: "100%" }}>
      {/* Header Section */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
          margin: 2,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold", color: "white" }}>
          Bugs
          <Chip
            label={`Total: ${teamBugs.length}`}
            size="small"
            sx={{
              ml: 2,
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              color: "#fff",
            }}
          />
        </Typography>
        <Tooltip title="Create a new bug">
          <IconButton
            onClick={() => setIsModalOpen(true)}
            sx={{
              color: "white",
              padding: "6px",
            }}
          >
            <AddIcon />
          </IconButton>
        </Tooltip>
      </Box>

      {/* Create Bug Modal */}
      <CreateBugModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateBug}
        teamId={teamId || 0}
      />

      {/* Table Section */}
      <TableContainer
        component={Paper}
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          borderRadius: 2,
          boxShadow: 3,
          overflow: "auto",
          maxHeight: "calc(100vh - 300px)",
          "&::-webkit-scrollbar": {
            width: "8px",
            height: "8px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            borderRadius: "4px",
          },
        }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {[
                "ID",
                "Reporter",
                "Assignee",
                "Severity",
                "Description",
                "Commit",
                "Fix",
                "Status",
                "Created",
              ].map((header) => (
                <TableCell
                  key={header}
                  sx={{
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    color: "#fff",
                    fontWeight: "bold",
                    borderBottom: "2px solid rgba(255, 255, 255, 0.1)",
                  }}
                >
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {teamBugs.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={9}
                  sx={{
                    color: "#fff",
                    textAlign: "center",
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    py: 4,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <InfoIcon sx={{ fontSize: 40, opacity: 0.5 }} />
                    <Typography>No bugs reported yet</Typography>
                  </Box>
                </TableCell>
              </TableRow>
            ) : (
              teamBugs
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((bug) => (
                  <TableRow
                    key={bug.id}
                    onMouseEnter={() => setHoveredRow(bug.id)}
                    onMouseLeave={() => setHoveredRow(null)}
                    sx={{
                      transition: "background-color 0.2s",
                      backgroundColor:
                        hoveredRow === bug.id
                          ? "rgba(255, 255, 255, 0.1)"
                          : "rgba(255, 255, 255, 0.05)",
                      "&:last-child td": { border: 0 },
                    }}
                  >
                    <TableCell sx={{ color: "#fff" }}>#{bug.id}</TableCell>
                    <TableCell sx={{ color: "#fff" }}>
                      {bug.reporter ? (
                        <Tooltip title={bug.reporter.email}>
                          <span>{bug.reporter.email.split("@")[0]}</span>
                        </Tooltip>
                      ) : (
                        <Chip
                          label="Unknown Reporter"
                          size="small"
                          sx={{
                            backgroundColor: "rgba(255, 255, 255, 0.1)",
                            color: "#fff",
                          }}
                        />
                      )}
                    </TableCell>

                    <TableCell sx={{ color: "#fff" }}>
                      {bug.assignee ? (
                        <Tooltip title={bug.assignee.email}>
                          <span>{bug.assignee.email.split("@")[0]}</span>
                        </Tooltip>
                      ) : (
                        <Chip
                          label="Unassigned"
                          size="small"
                          sx={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                        />
                      )}
                    </TableCell>
                    <TableCell>
                      {renderSeverityChip(
                        bug.severity as keyof typeof SEVERITY_CONFIG
                      )}
                    </TableCell>
                    <TableCell sx={{ color: "#fff", maxWidth: 300 }}>
                      <Tooltip title={bug.description}>
                        <Typography noWrap>{bug.description}</Typography>
                      </Tooltip>
                    </TableCell>
                    <TableCell>
                      <Tooltip title="View commit">
                        <IconButton
                          size="small"
                          href={bug.commit_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          sx={{ color: "#bbdefb" }}
                        >
                          <OpenInNewIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                    <TableCell>
                      {bug.fix_commit_link ? (
                        <Tooltip title="View fix commit">
                          <IconButton
                            size="small"
                            href={bug.fix_commit_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{ color: "#bbdefb" }}
                          >
                            <CheckCircleIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      ) : (
                        <Chip
                          label="Pending"
                          size="small"
                          sx={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                        />
                      )}
                    </TableCell>
                    <TableCell>
                      {renderStatusChip(
                        bug.status as keyof typeof STATUS_CONFIG
                      )}
                    </TableCell>
                    <TableCell sx={{ color: "#fff" }}>
                      <Tooltip title={new Date(bug.createdAt).toLocaleString()}>
                        <span>
                          {new Date(bug.createdAt).toLocaleDateString()}
                        </span>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={teamBugs.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{
          color: "#fff",
          ".MuiTablePagination-select": {
            color: "#fff",
          },
          ".MuiTablePagination-selectIcon": {
            color: "#fff",
          },
          ".MuiTablePagination-displayedRows": {
            margin: 0,
          },
          ".MuiTablePagination-actions": {
            display: "flex",
            alignItems: "center",
            gap: 1,
            marginLeft: 2,
          },
          ".MuiTablePagination-root": {
            overflow: "hidden",
          },
          ".MuiTablePagination-toolbar": {
            minHeight: 52,
            height: 52,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            flexWrap: "nowrap",
            padding: "0 16px",
          },
          ".MuiIconButton-root": {
            color: "#fff",
            padding: 1,
          },
          borderTop: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      />
    </Box>
  );
};

export default TestersBugTable;
