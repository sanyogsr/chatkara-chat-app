import { v2 as cloudinary } from "cloudinary";
import { v4 as uuid } from "uuid";
import jwt from "jsonwebtoken";
import mongoose, { mongo } from "mongoose";

const cookieOptions = {
  maxAge: 15 * 24 * 60 * 60 * 1000,
  sameSite: "none",
  httpOnly: true,
  secure: true,
};

const connectDb = (uri) => {
  mongoose
    .connect(uri, { dbName: "Chattu" })
    .then((data) => console.log(`Connected to DB: ${data.connection.host}`))
    .catch((err) => {
      throw err;
    });
};
const sendToken = (res, user, code, message) => {
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
  return res.status(code).coookie("chatkara-token", token, cookieOptions).json({
    sucsess: true,
    user,
    message,
  });
};

const uploadFilesToCLoudinary = async (files = []) => {
  const uploadPromise = files.map((file) => {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload(
        getBase64(file),
        {
          resource_type: "auto",
          public_id: uuid(),
        },

        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
    });
  });

  try {
    const results = await Promise.all(uploadPromise);

    const formattedResults = results.map((result) => ({
      public_id: result.public_id,
      url: result.secure_url,
    }));
    return formattedResults;
  } catch (error) {
    throw new Error("Error uploading files to cloudinary", error);
  }
};

export { uploadFilesToCLoudinary, sendToken, connectDb };
