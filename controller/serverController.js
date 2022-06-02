const Server = require("../model/model");

const serverController = {
  getAllServer: async (req, res) => {
    try {
      const user = await User.find();
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  addServer: async (req, res) => {
    console.log(req.body);
    try {
      const newUser = new User(req.body);
      const saveUser = await newUser.save();
      res.status(200).json(saveUser);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getServer: async (req, res) => {
    try {
      await User.findById(req.params.id)
        .then((user) => {
          res.status(200).json(user);
        })
        .catch((err) => {
          res.status(404).json("ID not found");
        });
    } catch (error) {}
  },
  updateServer: async (req, res) => {
    try {
      await User.findByIdAndUpdate(req.params.id, req.body, (err, doc) => {
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
    console.log(req.params.id);
    try {
      await Author.updateMany(
        { books: req.params.id },
        { $pull: { books: req.params.id } }
      );
      await Book.findByIdAndDelete(req.params.id);
      res.status(200).json("Deleted successfully");
    } catch (error) {}
  },
};

module.exports = userController;
