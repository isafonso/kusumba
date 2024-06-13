import { Sequelize } from "sequelize";

const sequelize = new Sequelize("pambalas", "root", undefined, {
  host: "127.0.0.1",
  dialect: "mysql",
  port: 3306,
});

try {
  sequelize.authenticate();
  console.log("Database connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database: ", error);
}

export { sequelize };
