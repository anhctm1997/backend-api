import jwt from "jsonwebtoken";
// import { User } from "../model/model";
const middlewareController = {
  verifyToken: (req, res, next) => {
    const token = req.headers.token;
    if (token) {
      const accessToken = token.split(" ")[1];
      jwt.verify(accessToken, process.env.PRIVATE_KEY, (err, user) => {
        if (err) {
          res.status(403).json("You do not have access");
        } else {
          req.user = user;
          next();
        }
      });
    } else {
      res.status(401).json("You're not authenticated");
    }
  },
  verifyPermissions: (req, res, next) => {
    middlewareController.verifyToken(req, res, () => {
      if (req.user.id === req.params.id || req.user.admin === true) {
        next();
      } else {
        res.status(403).json("You are not permissions");
      }
    });
  },
};

export default middlewareController;
