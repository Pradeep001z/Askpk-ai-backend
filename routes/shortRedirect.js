const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');

const db = admin.firestore();

router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const docRef = db.collection('shortlinks').doc(id);
    const doc = await docRef.get();
    if (!doc.exists) return res.status(404).send('Not found');

    const data = doc.data();
    // increment click count
    await docRef.update({ clicks: admin.firestore.FieldValue.increment(1) });

    // You can show interstitial ad page here — but we'll redirect directly
    res.redirect(data.targetUrl);
  } catch (e) {
    console.error(e);
    res.status(500).send('Server error');
  }
});

module.exports = router;
