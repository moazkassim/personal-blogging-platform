import express from "express";
import cors from "cors";
import "dotenv/config";
import { connect } from "node:http2";
import connectDB from "./config/mongodb.js";
import userRouter from "./routes/userRoute.js";
import postRouter from "./routes/postRoute.js";
const app = express();
const PORT = process.env.PORT || 4000;
connectDB();

// Middleware to parse JSON request bodies
app.use(express.json());

app.use(cors());
// Basic health check route
app.get("/", (req, res) => {
  res.json({ message: "Blog API is running!" });
});

//Define your routes here
app.use("/api/user", userRouter);
app.use("/api/post", postRouter);

app.listen(PORT, () => {
  console.log(`Server is live on http://localhost:${PORT}`);
});
