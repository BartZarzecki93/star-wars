import { Router } from "express";
import { createUser } from "../controllers/users";
import { logIn } from "../controllers/users";

const usersRouter = Router();

usersRouter.post("/login", logIn);

usersRouter.post("/register", createUser);

export default usersRouter;
