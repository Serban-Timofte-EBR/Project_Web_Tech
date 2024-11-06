require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
const errorHandler = require("./middleware/errorHandler");
const { sequelize, testConnection } = require("./config/database");
const { seedTeams } = require("./config/seedData");
// Import routes
const userRoutes = require("./routes/userRoutes");
const teamRoutes = require("./routes/teamRoutes")
// const projectRoutes = require('./routes/projectRoutes');
// const bugRoutes = require('./routes/bugRoutes');

// Initialize express app
const app = express();

// Middleware
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(morgan("dev")); // HTTP request logger
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Serve static files from public directory
app.use(express.static(path.join(__dirname, "../public")));

// Basic health check route
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// API Routes
app.use("/api/users", userRoutes);
app.use("/api/teams", teamRoutes);
// app.use('/api/projects', projectRoutes);
// app.use('/api/bugs', bugRoutes);

// Handle undefined routes
app.use("*", (req, res) => {
  res.status(404).json({
    error: "Resource not found",
    path: req.originalUrl,
  });
});

// Error handling middleware
app.use(errorHandler);

// Sync database models
const syncDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("📦 Database connection established successfully.");

    // Sync all models
    await sequelize.sync({
      force: process.env.DB_FORCE_SYNC === "true",
      alter: process.env.NODE_ENV === "development",
    });
    console.log("📊 Database synchronized successfully.");
    await seedTeams();
  } catch (error) {
    console.error("❌ Database connection error:", error.message);
    throw error;
  }
};

// Graceful shutdown function
const gracefulShutdown = async (signal) => {
  console.log(`\n${signal} received. Starting graceful shutdown...`);
  try {
    await sequelize.close();
    console.log("Database connections closed.");
    process.exit(0);
  } catch (error) {
    console.error("Error during graceful shutdown:", error);
    process.exit(1);
  }
};

// Start server function
const startServer = async () => {
  try {
    // Connect and sync database
    await syncDatabase();

    // Get port from environment variable or use default
    const PORT = process.env.PORT || 8000;

    // Start server
    const server = app.listen(PORT, () => {
      console.log(`
🚀 Server is running on port ${PORT}
🔍 Health check: http://localhost:${PORT}/health
🌍 Environment: ${process.env.NODE_ENV || "development"}
      `);
    });

    // Handle server-specific errors
    server.on("error", (error) => {
      if (error.code === "EADDRINUSE") {
        console.error(`❌ Port ${PORT} is already in use`);
      } else {
        console.error("❌ Server error:", error.message);
      }
      process.exit(1);
    });

    // Setup graceful shutdown
    process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
    process.on("SIGINT", () => gracefulShutdown("SIGINT"));
  } catch (error) {
    console.error("❌ Failed to start server:", error.message);
    process.exit(1);
  }
};

// Global error handlers
process.on("uncaughtException", (error) => {
  console.error("❌ Uncaught Exception:", error);
  gracefulShutdown("UNCAUGHT_EXCEPTION");
});

process.on("unhandledRejection", (error) => {
  console.error("❌ Unhandled Rejection:", error);
  gracefulShutdown("UNHANDLED_REJECTION");
});

// Start the server if this file is run directly
if (require.main === module) {
  startServer();
}

module.exports = app;
