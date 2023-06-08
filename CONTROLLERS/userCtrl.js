const UserModel = require("../MODELS/UserModel");
const jwt = require("jsonwebtoken");
const encryptPass = require("bcryptjs");
const { validationResult } = require("express-validator/check");

const addUser = async (req, res) => {
  try {
    const { fName, lName, email, password, confirmPassword } = req.body;
    console.log(req.files);

    const validationRes = validationResult(req);
    if (validationRes.errors.length > 0) {
      return res
        .status(201)
        .json({ status: "Error", data: validationRes.errors });
    } else if (password.trim() !== confirmPassword.trim()) {
      return res.status(201).json({
        status: "Error",
        data: [
          {
            msg: "Sorry Both password and Confirm password must be the same.",
          },
        ],
      });
    } else {
      // Check if user already exists
      const userExists = await UserModel.find({ email: email });
      if (userExists.length > 0) {
        return res.status(400).json({
          status: "Error",
          data: [{ msg: "Sorry user already exists" }],
        });
      }
      const newUser = new UserModel();
      newUser.firstName = fName;
      newUser.lastName = lName;
      newUser.email = email;
      // ENCRYPT PASSWORD
      const salt = await encryptPass.genSalt(10);
      const hashPass = await encryptPass.hash(password, salt);
      newUser.password = hashPass;

      /// GENERATE TOKEN
      const payload = {
        email: email,
        id: newUser.id,
      };
      jwt.sign(
        payload,
        "4472897njieS_!",
        { expiresIn: 360000 },
        async (err, token) => {
          if (err) {
            return res
              .status(201)
              .json({
                status: "Error",
                data: [{ msg: "Sorry There exists an error" }],
              });
          } else {
            if (req.files) {
              const docs = req.files.pImage;
              // docs.mv(`public/pImages/${email}/${docs.name}`);
              // newUser.profileImg = `${email}/${docs.name}`;
              docs.mv(`public/pImages/${docs.name}`);
              newUser.profileImg = `${docs.name}`;
            }

            await newUser.save();
            return res.status(200).json({
              status: "Success",
              data: [{ msg: newUser, token: token }],
            });
          }
        }
      );
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: "Failure", data: "Error..." });
  }
};

const modifyUser = (req, res) => {};

const getUser = (req, res) => {};

module.exports = {
  addUser,
  modifyUser,
};
