import express from "express";
import accountRoutes from "./routes/accountRoutes";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";

const app = express();
const port = 3000;

app.use(express.json());

// Implement CORS
app.use(cors());

// Set Security HTTP headers
app.use(helmet());

// Limit requests from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 10 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour!",
});
app.use("/api", limiter);

app.get("/", (req, res) => {
  res.send("ok");
});

app.use("/api/accounts", accountRoutes);

app.listen(port, () => {
  console.log(`Server ready at http://localhost:${port}`);
});
