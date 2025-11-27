const express = require('express');
const router = express.Router();
const { nanoid } = require('nanoid');
const admin = require('firebase-admin');

const db = admin.firestore();
const BASE_URL = process.env.BASE_URL || '';

router.post('/', async (req, res) => {
  const { targetUrl, ownerUid } = req.body;
  if (!targetUrl) return res.status(400).json({ error: 'targetUrl required' });

  const id = nanoid(6);
  const doc = {
    id,
    targetUrl,
    ownerUid: ownerUid || null,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    clicks: 0
  };

  await db.collection('shortlinks').doc(id).set(doc);
  return res.json({ ok: true, short: `${BASE_URL.replace(/\/$/, '')}/s/${id}` });
});

module.exports = router;
