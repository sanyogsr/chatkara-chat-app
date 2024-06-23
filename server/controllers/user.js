import { TryCatch } from "../middlewares/error";

const newUser = TryCatch(async (req, res, next) => {
  const { name, username, password, bio } = req.body;

  const file = req.file;

  if (!file) next("User Not found");

  const result = await uploadFilesToCLoudinary([file]);
});
