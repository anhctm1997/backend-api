const { User } = require("../model/model");
const jwt = require("jsonwebtoken");
const userController = {
  getAllUser: async (req, res) => {
    try {
      const PAGE_SIZE = parseInt(req.query.pageSize) || 3;
      const page = parseInt(req.query.page) < 1 ? 1 : parseInt(req.query.page);
      const token = req.cookies.token;
      if (!token) {
        res.redirect(403, "/login");
      } else {
        const id = jwt.verify(token, process.env.PRIVATE_KEY);
        const isAdmin = await User.findById(id).permissions;
        if (!isAdmin)
          return res.status(403).json({
            message: "Access permission error",
          });
      }
      if (!page) {
        const user = await User.find();
        res.status(200).json(user);
      } else {
        const user = await User.find()
          .skip((page - 1) * PAGE_SIZE)
          .limit(PAGE_SIZE);
        const totalUser = await User.find();
        const totalPage = totalUser.length / PAGE_SIZE;
        res.status(200).json({
          meta: {
            page: page,
            pageSize: PAGE_SIZE,
            totalPage: Math.ceil(totalPage),
          },
          data: user,
        });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },
  findUser: async (req, res) => {
    try {
      const PAGE_SIZE = parseInt(req.query.pageSize) || 3;
      const page = parseInt(req.query.page) < 1 ? 1 : parseInt(req.query.page);
      const token = req.cookies.token;
      if (!token) {
        res.redirect(403, "/login");
      } else {
        const id = jwt.verify(token, process.env.PRIVATE_KEY);
        const isAdmin = await User.findById(id).permissions;
        if (!isAdmin)
          return res.status(403).json({
            message: "Access permission error",
          });
      }
      const user = await User.find()
        .sort(res.query)
        .skip((page - 1) * PAGE_SIZE)
        .limit(PAGE_SIZE);
      const totalUser = user.length;
      const totalPage = totalUser.length / PAGE_SIZE;
      res.status(200).json({
        meta: {
          page: page,
          pageSize: PAGE_SIZE,
          totalPage: Math.ceil(totalPage),
        },
        data: user,
      });
    } catch (error) {
      req.status(500).json(error);
    }
  },
  addUser: async (req, res) => {
    console.log(req.body);
    try {
      const token = req.cookies.token;
      if (!token) {
        res.redirect(403, "/login");
      } else {
        const id = jwt.verify(token, process.env.PRIVATE_KEY);
        const isAdmin = await User.findById(id).permissions;
        if (!isAdmin)
          return res.status(403).json({
            message: "Access permission error",
          });
      }
      const newUser = new User(req.body);
      const saveUser = await newUser.save();
      res.status(200).json("Successful");
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getUser: async (req, res) => {
    try {
      const token = req.cookies.token;
      if (!token) {
        res.redirect(403, "/login");
      } else {
        const id = jwt.verify(token, process.env.PRIVATE_KEY);
        const isAdmin = await User.findById(id).permissions;
        if (!isAdmin)
          return res.status(403).json({
            message: "Access permission error",
          });
      }
      await User.findById(req.params.id)
        .then((user) => {
          res.status(200).json(user);
        })
        .catch((err) => {
          res.status(404).json("ID not found");
        });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  updateUser: async (req, res) => {
    try {
      const token = req.cookies.token;
      if (!token) {
        res.redirect(403, "/login");
      } else {
        const id = jwt.verify(token, process.env.PRIVATE_KEY);
        const isAdmin = await User.findById(id).permissions;
        if (!isAdmin)
          return res.status(403).json({
            message: "Access permission error",
          });
      }
      const id = req.params.id;
      const body = {
        password: req.body.password,
        permissions: req.body.permissions,
      };
      await User.findByIdAndUpdate(id, body, (err, doc, res) => {
        if (err) {
          res.status(404).json("ID not found");
        } else {
          res.status(200).json("Updated successfully!");
        }
      });
    } catch (error) {
      res.status(500).json(error);
    }
  },

  deleteUser: async (req, res) => {
    // console.log(req.params.id);
    try {
      const token = req.cookies.token;
      if (!token) {
        res.redirect(403, "/login");
      } else {
        const id = jwt.verify(token, process.env.PRIVATE_KEY);
        const isAdmin = await User.findById(id).permissions;
        if (!isAdmin)
          return res.status(403).json({
            message: "Access permission error",
          });
      }
      await User.findByIdAndDelete(req.params.id)
        .then(() => {
          res.status(200).json("Deleted successfully");
        })
        .catch((err) => {
          res.status(404).json(err.message);
        });
    } catch (error) {
      res.status(500).json("Bad Request");
    }
  },

  handleLogin: async (req, res, next) => {
    try {
      const user = await User.findOne({
        username: req.body.username,
        password: req.body.password,
      });
      if (user) {
        const token = jwt.sign(
          {
            _id: user._id,
            permissions: user.permissions,
          },
          "anhcuongdeptrai"
        );
        res.status(200).json({
          message: "Successfuly",
          token: token,
        });
        next();
      } else {
        return res.status(404).json({
          message: "Tai khoan hoac mat khau khong chinh xac",
        });
      }
    } catch (error) {
      return res.status(500).json({
        message: "Request time out",
      });
    }
  },
};

module.exports = userController;
