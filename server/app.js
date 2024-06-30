import express from "express";
import { connectDb } from "./utils/feature.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { createServer } from "http";
import cors from "cors";
import path from "path";
import cloudinary from "cloudinary";

dotenv.config({
  path: "./.env",
});

const mongoUri = process.env.MONGO_URI;
const port = process.env.PORT;
const envMode = process.env.NODE_ENV.trim() || "Production";

connectDb(mongoUri);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

