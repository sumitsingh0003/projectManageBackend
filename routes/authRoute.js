const express = require("express");
const { login, register, logout, updateUser, getUser } = require("../controllers/authentication");
const isAuthenticated = require("../middlewares/auth");

const authRouter = express.Router();

authRouter.post("/register", register).post("/login", login);
authRouter.post("/logout", isAuthenticated, logout);
authRouter.post("/update-user", isAuthenticated, updateUser);
authRouter.get("/get-user", isAuthenticated, getUser);


module.exports = authRouter;