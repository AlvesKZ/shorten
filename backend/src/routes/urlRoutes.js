import { Router } from "express";

import UrlController from "../controllers/UrlController.js";

const urlRoutes = Router();
const urlController = new UrlController();

urlRoutes.get('/', (req, res) => {
    res.send("Olá");
});

urlRoutes.post('/shorten', urlController.createShortUrl);

export default urlRoutes;