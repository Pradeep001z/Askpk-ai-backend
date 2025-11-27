const express = require('express');
const router = express.Router();
const { askGroq } = require('../controllers/askController');

router.post('/', async (req, res) => {
  try {
    const q = req.body.q || '';
    if (!q) return res.status(400).json({ error: 'question required' });

    const answer = await askGroq(q);
    res.json({ answer });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'server error', detail: e.message });
  }
});

module.exports = router;
