import http from "node:http";
import path from "node:path";
import routes from "./src/routes";
import express from "express";
import morgan from "morgan";
import { sequelize as database } from "./src/database";
import dotenv from "dotenv";
import cors from "cors";
import { Server } from "socket.io";

dotenv.config();

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 5050;
const host = process.env.HOST;
const io = new Server(server);

//Basic setup
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(routes);
//Static files
app.use(express.static(path.join(__dirname, "./public")));

io.on("connection", (socket) => {
  console.log("user has connected", socket);

  socket.emit("Server", socket.id);

  socket.on("disconnected", () => {
    console.log("user has left");
  });
});

//Turn on the server
server.listen("3333", async () => {
  try {
    await database.sync();
  } catch (error) {
    console.log("error: " + error);
  }
  console.log(`server running on ${host}:${port}`);
});
