import { sequelize } from "../database";
import { Association, DataTypes, Model } from "sequelize";
import UserModel from "./UserModel";

class ProductModel extends Model {
  public id!: string;
  public name!: string;
  public description!: string;
  public price!: number;
  public picture!: string;
  public category!: string;
  public userId!: string;

  public readonly user?: UserModel[];

  public static associations: {
    user: Association<ProductModel, UserModel>;
  };
}

ProductModel.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    price: {
      type: DataTypes.FLOAT.UNSIGNED,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    picture: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "products",
  }
);

export default ProductModel;
