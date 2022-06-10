import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import morgan from "morgan";
import helmet from "helmet";
import dotenv from "dotenv";
import routerUser from "./routes/user";
import routerAuth from "./routes/auth";
import routerServer from "./routes/server";
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
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(helmet());
app.use(cors());
app.use(morgan("common"));
app.get("/", function (req, res) {
  res.sendFile("public/index.html", { root: __dirname });
});
app.use("/api/auth", routerAuth);
app.use("/api/server", routerServer);
app.use("/api/user", routerUser);
app.listen(PORT, () => {
  console.log(`Server is running...${PORT}`);
});
