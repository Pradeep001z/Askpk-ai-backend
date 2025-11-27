const admin = require('firebase-admin');

module.exports = function initFirebase() {
  if (admin.apps.length) return admin.app();

  // Prefer base64 env (sa JSON encoded then base64)
  const saBase64 = process.env.FIREBASE_SA_BASE64 || null;
  const saPath = process.env.FIREBASE_SA_PATH || null;

  if (saBase64) {
    const saString = Buffer.from(saBase64, 'base64').toString('utf8');
    const serviceAccount = JSON.parse(saString);
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
    console.log('Firebase admin initialized via base64 service account.');
    return admin.app();
  } else if (saPath) {
    const serviceAccount = require(saPath);
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
    console.log('Firebase admin initialized via file path.');
    return admin.app();
  } else {
    console.warn('No Firebase service account provided. Auth verify will fail until set.');
  }
};
