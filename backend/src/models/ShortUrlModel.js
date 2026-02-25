export default class ShortUrlModel {
  constructor({
    id = null,
    url,
    shortCode,
    createdAt = new Date(),
    updatedAt = new Date(),
  }) {
    this.id = id;
    this.url = url;
    this.shortCode = shortCode;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  validate() {
    const errors = [];

    if (!this.url || typeof this.url !== "string") {
      errors.push("URL is required and must be a string.");
    }

    if (!this.url.match(/^https?:\/\/.+/)) {
      errors.push("URL must be a valid HTTP or HTTPS URL.");
    }

    if (!this.shortCode || typeof this.shortCode !== "string") {
      errors.push("Short code is required and must be a string.");
    }

    if (this.shortCode.length < 6) {
      errors.push("Short code must be at least 6 characters long.");
    }

    return errors;
  }

  toFirestore() {
    return {
      url: this.url,
      shortCode: this.shortCode,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  static fromFirestore(doc) {
    return new ShortUrlModel({
      id: doc.id,
      ...doc.data(),
    });
  }
}
