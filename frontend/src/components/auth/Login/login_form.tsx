import React, { useState } from "react";
import { Box, Typography, TextField, Button, Paper, Link } from "@mui/material";

interface LoginFormProps {
  onSubmit: (email: string, password: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(email, password);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #1e293b 0%, #3b4757 100%)",
        color: "white",
        p: 2,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 4,
          borderRadius: 3,
          backgroundColor: "rgba(0, 0, 0, 0.85)",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.3)",
          width: { xs: "100%", sm: "400px" },
        }}
      >
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            color: "#00bcd4",
            fontWeight: "bold",
            mb: 3,
          }}
        >
          Welcome Back
        </Typography>
        <Typography
          variant="body1"
          sx={{
            textAlign: "center",
            color: "rgba(255, 255, 255, 0.8)",
            mb: 4,
          }}
        >
          Login to access your account
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{
              mb: 3,
              input: { color: "#ffffff" },
              label: { color: "#ffffff" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#ffffff",
                },
                "&:hover fieldset": {
                  borderColor: "#00bcd4",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#00bcd4",
                },
              },
            }}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{
              mb: 3,
              input: { color: "#ffffff" },
              label: { color: "#ffffff" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#ffffff",
                },
                "&:hover fieldset": {
                  borderColor: "#00bcd4",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#00bcd4",
                },
              },
            }}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: "#00bcd4",
              color: "#ffffff",
              fontWeight: "bold",
              py: 1.5,
              "&:hover": {
                backgroundColor: "#0097a7",
              },
            }}
          >
            Login
          </Button>
        </form>
        <Typography
          variant="body2"
          sx={{
            mt: 3,
            textAlign: "center",
            color: "rgba(255, 255, 255, 0.7)",
          }}
        >
          Don’t have an account?{" "}
          <Link
            href="/create-user-account"
            sx={{
              color: "#00bcd4",
              fontWeight: "bold",
              "&:hover": {
                color: "#0097a7",
                textDecoration: "underline",
              },
            }}
          >
            Sign up
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default LoginForm;
