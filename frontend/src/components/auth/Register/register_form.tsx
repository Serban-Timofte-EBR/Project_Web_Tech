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
  onSubmit: (email: string, password: string, role: number) => void;
  authError: string | null;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit, authError }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [team, setTeam] = useState("");
  const [backgroundImg, setBackgroundImg] = useState("");
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

  // const fetchBackgroundImage = async () => {
  //   try {
  //     const response = await axios.get(
  //       "https://api.unsplash.com/photos/random",
  //       {
  //         headers: {
  //           Authorization: `Client-ID ${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}`,
  //         },
  //         params: { query: "modern technology", orientation: "landscape" },
  //       }
  //     );
  //     setBackgroundImg(response.data.urls.full);
  //   } catch (err) {
  //     console.error("Error fetching background image: ", err);
  //   }
  // };

  // useEffect(() => {
  //   fetchBackgroundImage();
  //   const interval = setInterval(() => {
  //     fetchBackgroundImage();
  //   }, 120000);
  //   return () => clearInterval(interval);
  // }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(email, password, role === "Tester" ? 0 : 1);
  };

  const handleCloseSnackbar = () => setOpenSnackbar(false);

  return (
    <Box
      style={{
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.15)",
          backdropFilter: "blur(10px)",
          borderRadius: 2,
          boxShadow: 3,
          width: "90%",
          maxWidth: 400,
          textAlign: "center",
          padding: 3,
        }}
      >
        <Typography variant="h5" sx={{ mb: 2, color: "#fff" }}>
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
            sx={{
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              borderRadius: 1,
              input: { color: "#000" },
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
              style: { color: "#000" },
            }}
            sx={{
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              borderRadius: 1,
              input: { color: "#000" },
              marginBottom: 4,
            }}
          />
          <TextField
            select
            fullWidth
            label="Role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            helperText="Please select your role"
            sx={{
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              borderRadius: 1,
              input: { color: "#0000" },
              marginBottom: 4,
            }}
          >
            <MenuItem value="Tester">Tester</MenuItem>
            <MenuItem value="Team Member">Team Member</MenuItem>
          </TextField>
          {role === "Team Member" && (
            <TextField
              select
              fullWidth
              label="Projects"
              value={team}
              onChange={(e) => setTeam(e.target.value)}
              helperText="Please select your project"
              sx={{
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                borderRadius: 1,
                input: { color: "#fff" },
              }}
            >
              {teamsLoading ? (
                <MenuItem disabled>Loading available projects...</MenuItem>
              ) : teamsError ? (
                <MenuItem disabled>Error loading available projects</MenuItem>
              ) : (
                teams_no_secrets.map((team) => (
                  <MenuItem key={team.id} value={team.name}>
                    {team.name}
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
              backgroundColor: "#6a82fb",
              "&:hover": { backgroundColor: "#5a72eb" },
            }}
          >
            Register
          </Button>
        </form>
        <Typography sx={{ mt: 2, color: "#fff" }}>
          Already have an account?{" "}
          <a href="/login" style={{ color: "#bbdefb" }}>
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
