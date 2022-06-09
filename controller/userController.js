import User from "../model/User";
import bcrypt from "bcryptjs/dist/bcrypt";
const userController = {
  getAllUser: async (req, res) => {
    try {
      const PAGE_SIZE = parseInt(req.query.pageSize) || 3;
      const page = parseInt(req.query.page) < 1 ? 1 : parseInt(req.query.page);
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
    try {
      const salt = await bcrypt.salt(10);
      const hashed = await bcrypt.hash(req.body.password, salt);
      console.log(hashed);
      const newUser = new User({
        username: req.body.username,
        password: hashed,
        admin: req.body.admin,
      });
      const saveUser = await newUser.save();
      res.status(200).json("Successful");
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getUser: async (req, res) => {
    try {
      const nameUser = req.params.search_query;
      User.findOne({
        name: nameUser,
      });
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
      const id = req.params.id;
      const body = {
        password: req.body.password,
        admin: req.body.admin,
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
    try {
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
};

export default userController;
