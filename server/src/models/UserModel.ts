import { sequelize } from "../database";
import { Association, DataTypes, Model } from "sequelize";
import ProductModel from "./ProductModel";

class UserModel extends Model {
  public id!: string;
  public username!: string;
  public email!: string;
  public password!: string;

  public readonly products?: ProductModel[];

  public static associations: {
    products: Association<UserModel, ProductModel>;
  };
}

UserModel.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "users",
  }
);

UserModel.hasMany(ProductModel, {
  foreignKey: "userId",
  as: "users_products",
});

ProductModel.belongsTo(UserModel, {
  foreignKey: "userId",
  as: "users_products",
});

export default UserModel;
