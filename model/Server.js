import mongoose from "mongoose";
const serverSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },

  password: {
    type: String,
    require: true,
  },
  ip: {
    type: String,
    require: true,
  },
  status: {
    type: String,
    require: true,
    default: "on",
  },
  cpu: {
    type: String,
    require: true,
  },
  ram: {
    type: Number,
    require: true,
    default: 1,
  },
  http: {
    type: Boolean,
    require: true,
    default: true,
  },
  https: {
    type: Boolean,
    require: true,
    default: true,
  },
});
const Server = mongoose.model("Server", serverSchema);
export default Server;
