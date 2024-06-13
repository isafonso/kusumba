import { Request, Response } from "express";
import { Op } from "sequelize";
import ProductModel from "../models/ProductModel";
import ProductsModel from "../models/ProductModel";

class ProductsControllers {
  public async index(req: Request, res: Response) {
    if (req.url == "/search") {
      const { search } = req.body;
      try {
        const data = await ProductModel.findAll({
          include: "users_products",
          where: {
            [Op.or]: {
              name: {
                [Op.like]: `%${search}%`,
              },
              description: {
                [Op.like]: `%${search}%`,
              },
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
    const { name, description, price, category, picture, userId } = req.body;
    const { user } = req;

    const imgUrl = `${process.env.HOST}:${process.env.PORT}/uploads/${req.file?.filename}`;
    try {
      const createProduct = await ProductsModel.create({
        name,
        description,
        price,
        category,
        picture: imgUrl,
        userId: user,
      });
      if (createProduct) {
        res.status(200).json({ data: createProduct });
      } else {
        res.status(400).json({ data: createProduct });
      }
    } catch (error) {
      console.error(error);
    }
  }

  public async show(req: Request, res: Response) {
    const { id } = req.params;
    const user = req.user;
    try {
      const data = await ProductsModel.findByPk(id, {
        include: "users_products",
      });
      if (data) {
        res.status(200).json({ data, id: user });
      } else {
        res.status(404).json({ data: "Producto não encontrado" });
      }
    } catch (error) {
      console.error(error);
    }
  }

  public async update(req: Request, res: Response) {
    const { name, description, price, picture } = req.body;
    const { id } = req.params;
    const imgUrl = `${process.env.HOST}:${process.env.PORT}/uploads/${req.file?.filename}`;
    try {
      const data = await ProductsModel.update(
        { name, description, price, picture: imgUrl },
        { where: { id: id } }
      );
      if (data) {
        res.status(200).json({ data });
      } else {
        res.status(400).json({ data: "Can´t update product" });
      }
    } catch (error) {
      console.error(error);
    }
  }

  public async destroy(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const deleteProduct = await ProductsModel.destroy({ where: { id: id } });
      if (deleteProduct) {
        res.status(200).json({ data: "Product deleted" });
      } else {
        res.status(400).json({ data: "Can´t delete product" });
      }
    } catch (error) {
      console.error(error);
    }
  }
}

export default new ProductsControllers();
