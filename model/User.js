import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, sparse: true },
  password: String,
  admin: {
    type: Boolean,
    required: true,
    default: false,
  },
});
const User = mongoose.model("User", userSchema);
export default User;
