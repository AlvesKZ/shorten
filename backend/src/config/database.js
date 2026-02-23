import admin from "firebase-admin";
import serviceAccount from "./firebase-service-account.json" assert { type: "json" };

class Database {
  static instance = null;

  static connect() {
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });
    }

    if (!this.instance) {
      this.instance = admin.firestore();
    }

    return this.instance;
  }
}

export default Database;