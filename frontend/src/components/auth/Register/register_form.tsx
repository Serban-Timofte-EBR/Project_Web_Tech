import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  MenuItem,
  Snackbar,
  Alert,
} from "@mui/material";
import { fetchTeamsNoSecrets } from "../../../redux/teams/teamsSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../../redux/store";

interface RegisterFormProps {
  onSubmit: (
    email: string,
    password: string,
    role: number,
    teamID: number | null
  ) => void;
  authError: string | null;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit, authError }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [teamId, setTeamId] = useState<number | null>(null);
  const [role, setRole] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const dispatch: AppDispatch = useDispatch();

  const {
    teams_no_secrets,
    loading: teamsLoading,
    error: teamsError,
  } = useSelector((state: RootState) => state.teams);

  useEffect(() => {
    if (role === "Team Member") {
      dispatch(fetchTeamsNoSecrets());
    }
  }, [dispatch, role]);

  useEffect(() => {
    if (authError) {
      setOpenSnackbar(true);
    }
  }, [authError]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(
      email,
      password,
      role === "Tester" ? 0 : 1,
      role === "Team Member" ? teamId : null
    );
  };

  const handleCloseSnackbar = () => setOpenSnackbar(false);

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #1e293b 0%, #3b4757 100%)",
      }}
    >
      <Box
        sx={{
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          backdropFilter: "blur(10px)",
          borderRadius: 4,
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.5)",
          padding: { xs: 3, sm: 5 },
          width: "90%",
          maxWidth: 420,
          textAlign: "center",
        }}
      >
        <Typography
          variant="h4"
          sx={{ mb: 3, fontWeight: "bold", color: "#90caf9" }}
        >
          Register
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            placeholder="Enter your email"
            variant="outlined"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputLabelProps={{
              style: { color: "#fff" },
            }}
            sx={{
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              borderRadius: 1,
              input: { color: "#fff" },
              mb: 2,
            }}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            placeholder="Enter your password"
            variant="outlined"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputLabelProps={{
              style: { color: "#fff" },
            }}
            sx={{
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              borderRadius: 1,
              input: { color: "#fff" },
              mb: 2,
            }}
          />
          <TextField
            select
            fullWidth
            label="Role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            helperText="Please select your role"
            InputLabelProps={{
              style: { color: "white" },
            }}
            sx={{
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              borderRadius: 1,
              input: { color: "white" },
              mb: 3,
            }}
          >
            <MenuItem value="Tester">Tester</MenuItem>
            <MenuItem value="Team Member">Team Member</MenuItem>
          </TextField>
          {role === "Team Member" && (
            <TextField
              select
              fullWidth
              label="Teams"
              value={teamId || ""}
              onChange={(e) => setTeamId(Number(e.target.value))}
              helperText="Please select your team"
              InputLabelProps={{
                style: { color: "#fff" },
              }}
              sx={{
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                borderRadius: 1,
                input: { color: "#fff" },
                mb: 3,
              }}
            >
              {teamsLoading ? (
                <MenuItem disabled>Loading available teams...</MenuItem>
              ) : teamsError ? (
                <MenuItem disabled>Error loading available teams</MenuItem>
              ) : (
                teams_no_secrets.map((teamOption) => (
                  <MenuItem key={teamOption.id} value={teamOption.id}>
                    {teamOption.name}
                  </MenuItem>
                ))
              )}
            </TextField>
          )}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              mt: 2,
              backgroundColor: "#1565c0",
              color: "#fff",
              fontWeight: "bold",
              "&:hover": { backgroundColor: "#0d47a1" },
            }}
          >
            Register
          </Button>
        </form>
        <Typography sx={{ mt: 2, color: "#90caf9" }}>
          Already have an account?{" "}
          <a href="/login" style={{ color: "#bbdefb", textDecoration: "none" }}>
            Login here
          </a>
        </Typography>
      </Box>
      <Snackbar
        open={openSnackbar && Boolean(authError)}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="error"
          sx={{ width: "100%" }}
        >
          {authError}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default RegisterForm;
