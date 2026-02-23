import "dotenv/config";
import express from "express";
import Database from "./config/database.js";
import urlRoutes from "./routes/urlRoutes.js";

const app = express();

app.use(express.json());
app.use("/", urlRoutes);

Database.connect()
  .then(() => {
    const port = process.env.PORT || 3000;

    app.listen(port, () => {
      console.log(`Servidor rodando em http://localhost:${port}`);
    });
  })
  .catch(console.error);
