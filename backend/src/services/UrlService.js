import UrlRepository from "../repositories/UrlRepository.js";
import ShortUrlModel from "../models/ShortUrlModel.js";

export default class UrlService {
  constructor() {
    this.urlRepository = new UrlRepository();
  }

  generateShortCode() {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let shortCode = "";
    for (let i = 0; i < 6; i++) {
      shortCode += characters.charAt(
        Math.floor(Math.random() * characters.length),
      );
    }
    return shortCode;
  }

  async createShortUrl(data) {
    if (!data || typeof data !== "object") {
      const error = new Error("Request body must be a valid JSON object.");
      error.statusCode = 400;
      throw error;
    }

    if (!data.url) {
      const error = new Error("URL is required.");
      error.statusCode = 400;
      error.details = ["url field is required"];
      throw error;
    }

    let shortCode;
    let isUnique = false;
    let attempts = 0;
    const maxAttempts = 10;

    while (!isUnique && attempts < maxAttempts) {
      shortCode = this.generateShortCode();
      isUnique = !(await this.urlRepository.shortCodeExists(shortCode));
      attempts++;
    }

    if (!isUnique) {
      const error = new Error(
        "Unable to generate unique short code. Please try again.",
      );
      error.statusCode = 500;
      throw error;
    }

    const shortUrl = new ShortUrlModel({
      url: data.url,
      shortCode: shortCode,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const errors = shortUrl.validate();
    if (errors.length > 0) {
      const error = new Error("Invalid URL format.");
      error.statusCode = 400;
      error.details = errors;
      throw error;
    }

    return await this.urlRepository.createShortUrl(shortUrl);
  }
}
