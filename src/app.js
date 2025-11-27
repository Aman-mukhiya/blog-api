import express from "express";
import cors from "cors";
import Router from "./routes/user.route.js"

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", Router);

export default app;