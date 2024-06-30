import jwt from "jsonwebtoken";
import { TryCatch } from "./error";
import { CHATKARA_TOKEN } from "../constants/config";
import { ErrorHandler } from "../utils/utility";

const isAuthenticated = TryCatch((req, res, next) => {
  const token = req.cookies(CHATKARA_TOKEN);
  if (!token) {
    return new ErrorHandler("Please Login to access the route", 401);
  }
  const decodedData = jwt.verify(token, process.env.JWT_SECRET);

  req.user = decodedData._id;
  next();
});
