import express from "express";
import cors from "cors";
import userRouter from "./routes/user.route.js"
import postRouter from "./routes/post.route.js"
import cookieParser from "cookie-parser";

const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use("/api", userRouter);
app.use("/api", postRouter);

export default app;