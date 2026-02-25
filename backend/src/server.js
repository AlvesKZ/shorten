import "dotenv/config";
import express from "express";

import Database from "./config/database.js";
import urlRoutes from "./routes/urlRoutes.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";

const app = express();

app.use(express.json());
app.use("/", urlRoutes);
app.use(errorMiddleware);

try {
  Database.connect();
  const port = process.env.PORT || 3000;

  app.listen(port, () => {
    console.log(`Server: http://localhost:${port}`);
  });
} catch (error) {
  console.error("Error to connect to database :", error);
  process.exit(1);
}