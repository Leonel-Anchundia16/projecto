import express from "express";
import { root } from "../controllers/authController.js";
// import { userAuth } from "../middleware/authMiddleware.js";

const routerAuth = express.Router();
const { signup, login } = root;

routerAuth.post("/signup", signup);

routerAuth.post("/login", login);

export default routerAuth;
