import { compare } from "bcrypt";
import { TryCatch } from "../middlewares/error";
import { User } from "../models/user";
import { sendToken } from "../utils/feature";
import { ErrorHandler } from "../utils/utility";

// Register the New User
const newUser = TryCatch(async (req, res, next) => {
  const { name, username, password, bio } = req.body;

  const file = req.file;

  if (!file) next("User Not found");

  const result = await uploadFilesToCLoudinary([file]);

  const avatar = {
    public_id: result[0].public_id,
    url: result[0].url,
  };

  const user = await User.create({
    name,
    username,
    password,
    bio,
    avatar,
  });

  sendToken(res, user, 201, "User Created");
});

// Login the user

const login = TryCatch(async (req, res, next) => {
  const { username, password } = req.body;

  const user = await user.findOne({ username }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid Name or pasword", 404));
  }

  const isMatch = await compare(password, user.password);
  if (!isMatch) {
    return new ErrorHandler("Invalid Username or password", 404);
  }

  sendToken(res, user, 200, `Welcome Back ,${user.password}`);
});
