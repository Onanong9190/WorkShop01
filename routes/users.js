var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");
const usersModel = require("../models/user.model");
// const regisModel = require("../models/userRegister");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource users");
});

router.post("/login", async function (req, res, next) {
  try {
    let { password, username } = req.body;
    let user = await usersModel.findOne({
      username: username,
    });
    if (!user) {
      return res.status(500).send({
        message: "Login Fail",
        success: false,
      });
    }
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return res.status(500).send({
        message: "Login Fail",
        success: false,
      });
    }
    const { _id, firstname, lastname, email } = user;
    return res.status(201).send({
      data: { _id, firstname, lastname, email },
      message: "Login Success",
      success: false,
    });
  } catch (error) {
    return res.status(500).send({
      message: "Login Fail",
      success: false,
    });
  }
});

// router.get("/login", function (req, res, next) {
//   try {
//     let payload = {
//       name: "admin",
//       role: "admin",
//     };

//     let token = jwt.sign(payload, process.env.token_key);

//     res.status(200).send({
//       token: token,
//       message: "Login Success",
//       success: true,
//     });
//   } catch (err) {
//     return res.status(err.status || 500).send({
//       message: err.message,
//     });
//   }
// });

//! Middleware ตรวจสอบ token
const detoken = (req, res, next) => {
  try {
    let token = req.headers.authorization.split("Bearer ")[1];
    let user_data = jwt.verify(token, process.env.token_key);

    req.user_data = user_data;

    if (user_data.role !== "admin") {
      next();
    } else {
      throw { message: "Permission Denied", status: 403 };
    }

    // next();
  } catch (err) {
    return res.status(err.status || 500).send({
      message: err.message,
    });
  }
};

// router.get("/login_admin", detoken, (req, res, next) => {
//   try {
//     let user_data = req.user_data;
//     return res.status(200).send({
//       data: user_data,
//       message: "Login Admin Success",
//       success: true,
//     });
//   } catch (err) {
//     return res.status(err.status || 500).send({
//       message: err.message,
//     });
//   }
// });

//* Create User **
router.post("/", async function (req, res, next) {
  try {
    let { username, password, firstname, lastname, email } = req.body;
    let hashPassword = await bcrypt.hash(password, 10);
    const new_user = new usersModel({
      username,
      password: hashPassword,
      firstname,
      lastname,
      email,
    });

    const user = await new_user.save();
    return res.status(200).send({
      data: {
        _id: user._id,
        username,
        password,
        firstname,
        lastname,
        email,
      },
      message: "Create User Success",
      success: true,
    });
  } catch (err) {
    return res.status(err.status || 500).send({
      message: "Create Fail",
      success: false,
    });
  }
});

//* register **
// router.post("/", async function (req, res, next) {
//   try {
//     let { userName, passWord, email, phone } = req.body;
//     let body = req.body;
//     let new_regis = new regisModel({
//       userName: body.userName,
//       passWord: body.passWord,
//       email: body.email,
//       phone: body.phone,
//     });

//     let regis = await new_regis.save();

//     return res.status(200).send({
//       data: { _id: regis._id, userName, passWord, email, phone },
//       message: "Register Success",
//       success: true,
//     });
//   } catch (error) {
//     res.status(err.status || 500).send({
//       message: err.message,
//     });
//   }
// });

//findOneByIdUser **

router.get("/:id", async (req, res, next) => {
  try {
    let id = req.params.id;

    let users = await usersModel.findById(id);
    return res.status(200).send({
      data: users,
      message: "Get Data Success",
      success: true,
    });
  } catch (err) {
    res.status(err.status || 500).send({
      message: err.message,
    });
  }
});

//* Update User By Id **
// router.put("/:id", async (req, res, next) => {
//   try {
//     let id = req.params.id;
//     let body = req.body;

//     await usersModel.updateOne(
//       { _id: id },
//       {
//         $set: {
//           userId: body.userId,
//           username: body.username,
//           password: body.password,
//           firstname: body.firstname,
//           lastname: body.lastname,
//         },
//       }
//     );

//     let users = await usersModel.findById(id);

//     return res.status(200).send({
//       data: users,
//       message: "Edit Data Success",
//       success: true,
//     });
//   } catch (err) {
//     res.status(err.status || 500).send({
//       message: err.message,
//     });
//   }
// });

//! Delete User By Id **
// router.delete("/:id", async (req, res, next) => {
//   try {
//     let id = req.params.id;

//     await usersModel.deleteOne({ _id: id });

//     let users = await usersModel.find();

//     return res.status(200).send({
//       data: users,
//       message: "Deleted Data Success",
//       success: true,
//     });
//   } catch (err) {
//     res.status(err.status || 500).send({
//       message: err.message,
//     });
//   }
// });

//? GetAllUser **
router.get("/get_all_user", async (req, res, next) => {
  try {
    let users = await usersModel.find();
    return res.status(200).send({
      data: users,
      message: "Get All User Success",
      success: true,
    });
  } catch (err) {
    res.status(err.status || 500).send({
      message: err.message,
    });
  }
});

module.exports = router;
