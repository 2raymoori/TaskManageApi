const UserModel = require("../MODELS/UserModel");
const { validationResult } = require("express-validator/check");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// const auth = async (req, res) => {
//   try {
//     const userFind = await UserModel.findById(req.user.id).select([
//       "-password",
//     ]);
//     return res
//       .status(200)
//       .json({ status: "Success", data: [{ msg: userFind }] });
//   } catch (error) {
//     return res
//       .status(500)
//       .json({ status: "Error", data: [{ msg: "Server Error...." }] });
//   }
// };
const login = async (req, res) => {
  try {
    const inputValidate = validationResult(req);
    if (inputValidate.errors.length > 0) {
      return res
        .status(201)
        .json({ status: "Error", data: inputValidate.errors });
    } else {
      const { password, email } = req.body;
      const userFind = await UserModel.find({ email: email });
      // check if user exists
      if (userFind.length > 0) {
        // Check is passwor matches
        const currentUser = userFind[0];
        const passwordVerifyCheck = await bcrypt.compare(
          password,
          currentUser.password
        );
        if (passwordVerifyCheck) {
          // every thing okay. return token
          const payload = {
            email: currentUser.email,
            id: currentUser.id,
          };
          jwt.sign(payload, "4472897njieS_!", (err, token) => {
            if (err) throw err;
            // console.log(currentUser);
            const user = {
              firstName: currentUser.firstName,
              lastName: currentUser.lastName,
              email: currentUser.email,
            };
            return res
              .status(200)
              .json({ status: "Success", msg: { token, user } });
          });
        } else {
          // password not match
          return res.status(201).json({
            status: "Error",
            data: [{ msg: `Sorry No Such user with these credentials` }],
          });
        }
      } else {
        return res.status(201).json({
          status: "Error",
          data: [{ msg: `Sorry No Such user with these credentials` }],
        });
      }
      // return res.status(200).json({"status":"success","data":[{"msg":userFind}]})
    }
  } catch (error) {}
};
const cnangePassword = async (req, res) => {
  try {
    const inputValidate = validationResult(req);
    if (inputValidate.errors.length > 0) {
      return res
        .status(201)
        .json({ status: "Error", data: inputValidate.errors });
    } else {
      const { oldPassword, newPassword } = req.body;
      console.log(req.body);
      const curUser = await UserModel.find({ email: req.user.email });
      const passwordVerifyCheck = await bcrypt.compare(
        oldPassword,
        curUser[0].password
      );
      if (passwordVerifyCheck) {
        const salt = await bcrypt.genSalt(10);
        curUser[0].password = await bcrypt.hash(newPassword, salt);
        await curUser[0].save();
        return res
          .status(200)
          .json({ status: "success", data: [{ msg: curUser }] });
      } else {
        return res
          .status(201)
          .json({ status: "Error", data: [{ msg: "Old Password Not Match" }] });
      }
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: "Error", data: [{ msg: "Server Error...." }] });
  }
};

module.exports = {
  login,
  updatePassword: cnangePassword,
};
