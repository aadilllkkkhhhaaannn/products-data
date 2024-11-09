const bcrypt = require("bcryptjs");
const User = require("../Models/userModel");
const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const registerUser = expressAsyncHandler(async (req, res) => {
  // check if all fileds are filled

  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please fill all details");
  }

  //   check if user already exists

  const userExist = await User.findOne({ email: email });

  if (userExist) {
    res.status(400);
    throw new Error("user already exist");
  }

  //   hash password

  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  //   register user

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (!user) {
    res.status(400);
    throw new Error("user Not Created");
  }

  res.status(200).json({
    id: user._id,
    name: user.name,
    email: user.email,
    token: generateToken(user.token),
  });

  //   res.json({
  //     msg: "user Registered!",
  //   });
});
const loginUser = async (req, res) => {
  // check if all fileds are filled

  const { email, password } = req.body;

  if (!email || !password) {
    res.status(401);
    throw new Error("Please fill all details");
  }

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user.token),
    });
  } else {
    res.status(400);
    throw new Error("Invalid Credentials");
  }

  //   res.json({
  //     msg: "user Logined!",
  //   });
};

// Generate token

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = { registerUser, loginUser };
