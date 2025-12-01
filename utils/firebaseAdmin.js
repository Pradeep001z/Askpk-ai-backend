import admin from "firebase-admin";

let serviceAccount = process.env.FIREBASE_ADMIN_KEY;

if (!serviceAccount) {
  console.error("❌ FIREBASE_ADMIN_KEY is missing!");
  process.exit(1);
}

try {
  serviceAccount = JSON.parse(serviceAccount);
} catch (error) {
  console.error("❌ FIREBASE_ADMIN_KEY JSON parse error:", error.message);
  process.exit(1);
}

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export default admin;
