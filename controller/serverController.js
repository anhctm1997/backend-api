const { Server } = require("../model/model");
const jwt = require("jsonwebtoken");
const serverController = {
  getAllServer: async (req, res) => {
    try {
      const PAGE_SIZE = parseInt(req.query.pageSize) || 3;
      const page = parseInt(req.query.page) < 1 ? 1 : parseInt(req.query.page);
      const token = req.cookies.token;
      if (!token) {
        res.redirect(403, "/login");
      } else {
        const id = jwt.verify(token, process.env.PRIVATE_KEY);
        // const isAdmin = await User.findById(id).permissions;
        // if (!isAdmin)
        //   return res.status(403).json({
        //     message: "Access permission error",
        //   });
      }
      if (!page) {
        const server = await User.find();
        res.status(200).json(user);
      } else {
        const server = await Server.find()
          .skip((page - 1) * PAGE_SIZE)
          .limit(PAGE_SIZE);
        const totalServer = await Server.find();
        const totalPage = totalServer.length / PAGE_SIZE;
        res.status(200).json({
          meta: {
            page: page,
            pageSize: PAGE_SIZE,
            totalPage: Math.ceil(totalPage),
          },
          data: server,
        });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },
  findServer: async (req, res) => {
    try {
      const PAGE_SIZE = parseInt(req.query.pageSize) || 3;
      const page = parseInt(req.query.page) < 1 ? 1 : parseInt(req.query.page);
      const token = req.cookies.token;
      if (!token) {
        res.redirect(403, "/login");
      } else {
        const id = jwt.verify(token, process.env.PRIVATE_KEY);
        // const isAdmin = await User.findById(id).permissions;
        // if (!isAdmin)
        //   return res.status(403).json({
        //     message: "Access permission error",
        //   });
      }
      const server = await Server.find()
        .sort(res.query)
        .skip((page - 1) * PAGE_SIZE)
        .limit(PAGE_SIZE);
      const totalServer = server.length;
      const totalPage = totalUser.length / PAGE_SIZE;
      res.status(200).json({
        meta: {
          page: page,
          pageSize: PAGE_SIZE,
          totalPage: Math.ceil(totalPage),
        },
        data: server,
      });
    } catch (error) {
      req.status(500).json(error);
    }
  },
  addServer: async (req, res) => {
    console.log(req.body);
    try {
      const token = req.cookies.token;
      if (!token) {
        res.redirect(403, "/login");
      } else {
        const id = jwt.verify(token, process.env.PRIVATE_KEY);
        // const isAdmin = await User.findById(id).permissions;
        // if (!isAdmin)
        //   return res.status(403).json({
        //     message: "Access permission error",
        //   });
      }
      const newServer = new User(req.body);
      const saveServer = await newServer.save();
      res.status(200).json("Successful");
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getServer: async (req, res) => {
    try {
      const token = req.cookies.token;
      if (!token) {
        res.redirect(403, "/login");
      } else {
        const id = jwt.verify(token, process.env.PRIVATE_KEY);
        // const isAdmin = await User.findById(id).permissions;
        // if (!isAdmin)
        //   return res.status(403).json({
        //     message: "Access permission error",
        //   });
      }
      await Server.findById(req.params.id, (err, server) => {
        if (err) {
          res.status(404).json("ID not found");
        } else {
          res.status(200).json(server);
        }
      });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  updateServer: async (req, res) => {
    try {
      const token = req.cookies.token;
      if (!token) {
        res.redirect(403, "/login");
      } else {
        const id = jwt.verify(token, process.env.PRIVATE_KEY);
        // const isAdmin = await User.findById(id).permissions;
        // if (!isAdmin)
        //   return res.status(403).json({
        //     message: "Access permission error",
        //   });
      }
      const id = req.params.id;
      await User.findByIdAndUpdate(id, body, (err, server) => {
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

  deleteServer: async (req, res) => {
    // console.log(req.params.id);
    try {
      const token = req.cookies.token;
      if (!token) {
        res.redirect(403, "/login");
      } else {
        //const id = jwt.verify(token, process.env.PRIVATE_KEY);
        // const isAdmin = await User.findById(id).permissions;
        // if (!isAdmin)
        //   return res.status(403).json({
        //     message: "Access permission error",
        //   });
      }
      await User.findByIdAndDelete(req.params.id, (err, res) => {
        if (err) {
          res.status(404).json("ID not found");
        } else {
          res.status(200).json("Deleted successfully");
        }
      });
    } catch (error) {
      res.status(500).json("Bad Request");
    }
  },

  remoteSSH: async (req, res, next) => {
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
