// routes/auth.js
const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');

// Verify Firebase ID token (sent from frontend after Google sign-in)
router.post('/verify', async (req, res) => {
  const idToken = req.body.idToken;
  if(!idToken) return res.status(400).json({ error: 'No token' });

  try {
    const decoded = await admin.auth().verifyIdToken(idToken);
    // decoded contains uid, email, etc
    return res.json({ ok: true, uid: decoded.uid, email: decoded.email });
  } catch (e) {
    console.error('Token verify error', e);
    return res.status(401).json({ ok:false, error: e.message });
  }
});

module.exports = router;
