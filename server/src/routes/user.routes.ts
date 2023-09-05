import express from "express";
import { createUser, login } from "../controller/user.controller";

const userRoutes = express.Router();

userRoutes.get("/");
userRoutes.post("/register", createUser);
userRoutes.post("/login", login);

export default userRoutes;
