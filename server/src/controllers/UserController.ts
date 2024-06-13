import { compareSync, hashSync } from "bcrypt";
import { Request, Response } from "express";
import UsersModel from "../models/UserModel";
import cookie from "cookie";
import jwt from "jsonwebtoken";
import { Op } from "sequelize";

interface IUsers {
  username: string;
  email: string;
  password: string;
}

class UserController {
  public async index(req: Request, res: Response) {
    if (req.url == "/feed") {
      const id = req.user;

      try {
        const data = await UsersModel.findAll({
          include: "users_products",
          where: {
            id: {
              [Op.ne]: id,
            },
          },
        });
        console.log(data);
        if (data) res.status(200).json({ data });
      } catch (error) {
        res.status(500).json({ error });
        console.error(error);
      }
    }

    if (req.url == "/profile") {
      const id = req.user;
      try {
        const data = await UsersModel.findAll({
          include: "users_products",
          where: {
            id: {
              [Op.eq]: id,
            },
          },
        });
        console.log(data);
        if (data) res.status(200).json({ data });
      } catch (error) {
        res.status(500).json({ error });
        console.error(error);
      }
    }
  }

  public async store(req: Request, res: Response) {
    const { username, email, password } = req.body;
    const passHashed = hashSync(password, 10);
    try {
      const data = await UsersModel.create({
        username,
        email,
        password: passHashed,
      });

      const { id } = data;

      if (data) {
        const token = jwt.sign({ id }, String(process.env.SECRET_JWT), {
          expiresIn: 86400,
          algorithm: "HS256",
        });
        res.status(201).json({ data, id, token });
      }
    } catch (error) {
      res.status(401).json({ error });
      console.error(error);
    }
  }

  public async show(req: Request, res: Response) {
    if (req.url == "/login") {
      const { email, password } = req.body;
      //const { cookie } = req.headers;

      //console.log(cookie);

      try {
        const data = await UsersModel.findOne({
          where: {
            email,
          },
        });

        const id = data?.id;
        const passHashed = data?.password;
        if (compareSync(password, String(passHashed))) {
          const token = jwt.sign({ id }, String(process.env.SECRET_JWT), {
            expiresIn: 86400,
            algorithm: "HS256",
          });
          res.status(200).json({ data, id: data?.id, token });
        } else {
          res
            .status(401)
            .json({ error: "Sua password está errada, tente novamente" });
        }
      } catch (error) {
        res.status(401).json({ error });
        console.error(error);
      }
    } else if (req.url == `/user/${req.params.id}`) {
      const { id } = req.params;
      try {
        const showUser = await UsersModel.findAll({
          where: { id: id },
          include: "users_products",
        });
        if (showUser) {
          res.status(200).json({ data: showUser });
        } else {
          res.status(201).json({ data: "Usuário não encontrado" });
        }
      } catch (error) {
        console.error(error);
      }
    }
  }

  public async update(req: Request, res: Response) {
    const { username, email, password } = req.body;
    const { id } = req.params;
    try {
      const updateUser = await UsersModel.update(
        { username, email, password },
        { where: { id: id } }
      );
      if (updateUser) {
        res.status(200).json({ data: "User updated" });
      } else {
        res.status(400).json({ data: "Can´t update user" });
      }
    } catch (error) {
      console.error(error);
    }
  }

  public async destroy(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const deleteUser = await UsersModel.destroy({ where: { id: id } });
      if (deleteUser) {
        res.status(200).json({ data: "User deleted" });
      } else {
        res.status(400).json({ data: "Can´t delete user" });
      }
    } catch (error) {
      console.error(error);
    }
  }
}

export default new UserController();
