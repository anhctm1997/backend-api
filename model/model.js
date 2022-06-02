const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, sparse: true },
  password: String,
  permissions: {
    type: Boolean,
    required: true,
    default: false,
  },
});
// userSchema.pre("save", async function (next) {
//   const user = this;
//   if (this.isModified("password") || this.isNew) {
//     bcrypt.genSalt(10, function (saltError, salt) {
//       if (saltError) {
//         return next(saltError);
//       } else {
//         bcrypt.hash(user.password, salt, function (hashError, hash) {
//           if (hashError) {
//             return next(hashError);
//           }

//           user.password = hash;
//           next();
//         });
//       }
//     });
//   } else {
//     return next();
//   }
// });

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

let User = mongoose.model("User", userSchema);
let Server = mongoose.model("Server", serverSchema);

module.exports = { User, Server };
// module.exports = User;
// module.exports = Server;
