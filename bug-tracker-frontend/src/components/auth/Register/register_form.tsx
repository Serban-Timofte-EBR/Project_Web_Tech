import React, { useState, useEffect } from "react";
import { TextField, Button, Box, Typography, MenuItem } from "@mui/material";
import axios from "axios";
import { fetchTeams } from "../../../redux/teams/teamsSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../../redux/store";

const RegisterForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [team, setTeam] = useState("");
  const [backgroundImg, setBackgroundImg] = useState("");

  const dispatch: AppDispatch = useDispatch();
  const { teams, loading, error } = useSelector(
    (state: RootState) => state.teams
  );

  useEffect(() => {
    dispatch(fetchTeams());
  }, [dispatch]);

  const fetchBackgroundImage = async () => {
    try {
      const response = await axios.get(
        "https://api.unsplash.com/photos/random",
        {
          headers: {
            Authorization: `Client-ID ${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}`,
          },
          params: { query: "modern technology", orientation: "landscape" },
        }
      );
      setBackgroundImg(response.data.urls.full);
    } catch (err) {
      console.error("Error fetching background image: ", err);
    }
  };

  useEffect(() => {
    fetchBackgroundImage();
    const interval = setInterval(() => {
      fetchBackgroundImage();
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <Box
      style={{
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
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
            InputLabelProps={{
              style: { color: "#000" },
            }}
            sx={{
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              borderRadius: 1,
              input: { color: "#fff" },
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
              input: { color: "#fff" },
            }}
          />
          <TextField
            select
            fullWidth
            label="Team"
            value={team}
            onChange={(e) => setTeam(e.target.value)}
            helperText="Please select your team"
            InputLabelProps={{
              style: { color: "#000" },
            }}
            sx={{
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              borderRadius: 1,
              input: { color: "#fff" },
            }}
          >
            {loading ? (
              <MenuItem disabled>Loading teams...</MenuItem>
            ) : error ? (
              <MenuItem disabled>Error loading teams</MenuItem>
            ) : (
              teams.map((team: string) => (
                <MenuItem key={team} value={team}>
                  {team}
                </MenuItem>
              ))
            )}
          </TextField>

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
        <Typography sx={{ color: "#bbdefb" }}>
          <a href="/create-team" style={{ color: "#bbdefb" }}>
            Create a team
          </a>
        </Typography>
      </Box>
    </Box>
  );
};

export default RegisterForm;
