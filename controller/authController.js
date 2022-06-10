import User from "../model/User.js";
import jwt from "jsonwebtoken";
const authController = {
  generateAccessToken: (user) => {
    return jwt.sign(
      {
        _id: user._id,
        admin: user.admin,
      },
      process.env.PRIVATE_KEY,
      {
        expiresIn: "30m",
      }
    );
  },
  generateResetToken: (user) => {
    return jwt.sign(
      {
        _id: user._id,
        admin: user.admin,
      },
      process.env.RESET_KEY,
      {
        expiresIn: "365d",
      }
    );
  },
  login: async (req, res) => {
    try {
      const user = await User.findOne({
        username: req.body.username,
        password: req.body.password,
      });
      if (user) {
        const accessToken = authController.generateAccessToken(user);
        const resetToken = authController.generateResetToken(user);
        res.cookie("resetToken", resetToken, {
          httpOnly: true,
          secure: false,
          path: "/",
          sameSite: "strict",
        });
        res.status(200).json({
          message: "Successfuly",
          token: accessToken,
          username: user.username,
        });
      } else {
        return res.status(404).json({
          message: "Tai khoan hoac mat khau khong chinh xac",
        });
      }
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  logout: async (req, res) => {
    try {
    } catch (err) {}
  },
  resetToken: async (req, res) => {
    const isToken = req.cookies.resetToken;
    if (!isToken) {
      return res.status(401).json("You are not autheticated");
    }
    jwt.verify(isToken, process.env.RESET_KEY, (err, user) => {
      if (err) {
        console.log(err);
      } else {
        const newAccessToken = authController.generateAccessToken(user);
        const newResetToken = authController.generateResetToken(user);
        res.cookie("resetToken", newResetToken, {
          httpOnly: true,
          secure: false,
          path: "/",
          sameSite: "strict",
        });
        res.status(200).json({
          message: "Successfuly",
          token: newAccessToken,
        });
      }
    });
  },
};

export default authController;
