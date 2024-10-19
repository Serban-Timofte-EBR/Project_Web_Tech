import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";

// Load environment variables
dotenv.config();

const app: Express = express();
const port: number = parseInt(process.env.PORT || "8080", 10);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cors());

// Routes
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello World!" });
});

// Start server
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

export default app;
