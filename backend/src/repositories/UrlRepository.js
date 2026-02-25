import Database from "../config/database.js";
const db = Database.connect();
import ShortUrlModel from "../models/ShortUrlModel.js";

export default class UrlRepository {
  constructor() {
    this.collection = db.collection("shortUrls");
  }

  async createShortUrl(shortUrlModel) {
    const docRef = await this.collection.add(shortUrlModel.toFirestore());
    shortUrlModel.id = docRef.id;
    return shortUrlModel;
  }

  async getByShortCode(shortCode) {
    const snapshot = await this.collection
      .where("shortCode", "==", shortCode)
      .limit(1)
      .get();

    if (snapshot.empty) {
      return null;
    }

    return ShortUrlModel.fromFirestore(snapshot.docs[0]);
  }

  async shortCodeExists(shortCode) {
    const snapshot = await this.collection
      .where("shortCode", "==", shortCode)
      .limit(1)
      .get();
    return !snapshot.empty;
  }
}
