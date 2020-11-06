import { RequestHandler, Request, Response } from "express";
import User from "../models/User";
import jwt from "jsonwebtoken";
import StarWarsService from "../service/starwars-service";

export const createUser: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const password = (req.body as { password: string }).password;
    const email = (req.body as { email: string }).email;

    const hero = await StarWarsService.generateHero();

    const user = new User({
      email: email,
      password: password,
      heroId: hero.id,
      heroName: hero.name
    });

    const userCheck = await User.findOne({
      email: email,
      password: password
    });

    if (userCheck)
      return res.status(403).json({
        message: "User Already Exists"
      });

    const newUser = await user.save();

    const token = jwt.sign({ user }, "secretkey");

    return res.status(201).json({ user: newUser, token: token });
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
};

export const logIn: RequestHandler = async (req: Request, res: Response) => {
  try {
    const password = (req.body as { password: string }).password;
    const username = (req.body as { username: string }).username;

    const userParam = {
      username: username,
      password: password
    };

    const user = await User.findOne(userParam);

    if (!user)
      return res.status(403).json({
        message: "Wrong Password or Username"
      });
    //{ expiresIn: "60s" }
    const token = jwt.sign({ user }, "secretkey");

    return res.status(201).json({
      message: "Logged in!",
      token
    });
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
};
