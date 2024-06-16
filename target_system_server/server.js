import express from "express";
import db from "./db/knex.js";
import { knexConfig } from "./db/knexfile.js";
import mysql from "mysql2/promise";
import employeeRoutes from "./routes/employeeRoutes.js";
import areaRoutes from "./routes/areaRoutes.js";
import territoryRoutes from "./routes/territoryRoutes.js";
import targetRoutes from "./routes/targetRoutes.js";
import cors from 'cors';


const server = express();

server.use(function (req, res, next) {
  res.header("Access-Control-Origin", "*");
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};
server.use(cors(corsOptions));
server.use(express.json({ extended: true }));
server.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5000;

// Function to create database if it doesn't exist
const createDatabaseIfNotExists = async () => {
  const { host, user, password, database } = knexConfig['development'].connection;
  const connection = await mysql.createConnection({ host, user, password });

  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);
  await connection.end();
};

server.use("/api/v1/employees", employeeRoutes);
server.use("/api/v1/areas", areaRoutes);
server.use("/api/v1/territories",territoryRoutes);
server.use("/api/v1/targets", targetRoutes);

// Main function to start the server
const startServer = async () => {
  try {
    await createDatabaseIfNotExists();

    await db.migrate.latest();
    console.log("Migrations ran successfully");

    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Error setting up database or running migrations: ", err);
    process.exit(1);
  }
};


startServer();



export default server;
