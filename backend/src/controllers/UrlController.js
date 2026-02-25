import UrlService from "../services/UrlService.js";

export default class UrlController {
  constructor() {
    this.urlService = new UrlService();
    this.createShortUrl = this.createShortUrl.bind(this);
  }

  async createShortUrl(req, res, next) {
    try {
      const shortUrl = await this.urlService.createShortUrl(req.body);
      res.status(201).json(shortUrl);
    } catch (error) {
      next(error);
    }
  }
}
