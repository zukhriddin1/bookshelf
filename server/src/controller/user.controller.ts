import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import userModel, { Iuser } from "../models/user.model";

interface ILoginRequest extends Request {
  body: {
    name: string;
    password: string;
  };
}

export async function createUser(req: Request, res: Response) {
  try {
    const { name, password, email } = req.body;
    console.log(req.body);

    const newUser = {
      name,
      password,
      email,
    };

    const createdUser = await userModel.create(newUser);
    console.log(createdUser);

    res.status(201).send({ user: createdUser });
  } catch (error) {
    res.status(400).json({ error: "Server xatosi yuz berdi" });
  }
}

export async function login(req: ILoginRequest, res: Response) {
  try {
    const user: Iuser | null = await userModel.findOne({
      name: req.body.name,
      password: req.body.password,
    });

    if (user) {
      const token = jwt.sign({ id: user._id }, "your-secret-key-here", {
        expiresIn: "7d",
      });
      res.cookie("token", token, { httpOnly: true, secure: false });
      res.status(200).send("Success");
    } else {
      res.status(400).send({ message: "Foydalanuvchi topilmadi" });
    }
  } catch (error) {
    res.status(500).send({ error: "Server xatosi yuz berdi" });
  }
}
