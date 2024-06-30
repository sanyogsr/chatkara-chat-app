import express from "express";
import { newUser, login } from "../controllers/user";
import { isAuthenticated } from "../middlewares/auth";
import { validateHandler } from "../lib/validator";

import { singleAvatar } from "../middlewares/multer";

import { loginValidator, registerValidator } from "../lib/validator";

const app = express.Router();

app.post("/new", singleAvatar, registerValidator(), validateHandler, newUser);
app.post("/login", loginValidator(), validateHandler, login);

// AFter here user must be logged in to access the routes
