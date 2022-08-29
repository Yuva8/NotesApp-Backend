const asyncHandler = require("express-async-handler");
const Userinfo = require("../models/usermodel");
const Token = require("../utils/generateToken");
exports.registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;

  const userExist = await Userinfo.Userdata.findOne({ email });
  if (userExist) {
    res.status(400).send(`User ${name} already exists`);
    throw new Error(`User ${name} already exists`);
  }
  const user = await Userinfo.Userdata.create({
    name,
    email,
    password,
    pic,
  });
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: Token.generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Error Occured!");
  }
});

exports.authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await Userinfo.Userdata.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: Token.generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

exports.updateUserprofile = asyncHandler(async (req, res) => {
  const user = await Userinfo.Userdata.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.pic = req.body.pic || user.pic;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      pic: updatedUser.pic,
      isAdmin: updatedUser.isAdmin,
      token: Token.generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});
