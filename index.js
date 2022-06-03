const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const mongoose = require("mongoose");
let bodyParser = require("body-parser");
const morgan = require("morgan");
const helmet = require("helmet");
const dotenv = require("dotenv");
const routeServer = require("./routes/server");
const routeUser = require("./routes/user");
const PORT = process.env.PORT || 8000;
const { User } = require("./model/model");
const { handleLogin } = require("./controller/userController");
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
// router
// app.use("/api/server", routeServer);
app.get("/", function (req, res) {
  res.sendFile("public/index.html", { root: __dirname });
});
app.post("/login", handleLogin);
app.use("/api/user", routeUser);
app.listen(PORT, () => {
  console.log(`Server is running...${PORT}`);
});
