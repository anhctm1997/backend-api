import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import morgan from "morgan";
import helmet from "helmet";
import dotenv from "dotenv";
import routerUser from "./routes/user.js";
import routerAuth from "./routes/auth.js";
import routerServer from "./routes/server.js";
const PORT = process.env.PORT || 8000;
const app = express();
dotenv.config();
mongoose.connect(process.env.MONGODB_URL, (err) => {
  if (err) {
    console.log(err);
  }
  console.log("Connected to MongoDB");
});
app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors());
app.use(morgan("common"));
app.use("/api/auth", routerAuth);
app.use("/api/server", routerServer);
app.use("/api/user", routerUser);
app.listen(PORT, () => {
  console.log(`Server is running...${PORT}`);
});
