// routes/ask.js
const express = require('express');
const router = express.Router();
const fetch = (...args) => import('node-fetch').then(({default: f}) => f(...args));

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_API_URL = process.env.GROQ_API_URL || 'https://api.groq.ai/v1/chat/completions'; // replace if different

// optional auth middleware to require login
async function verifyFirebaseToken(req, res, next){
  // If you want to require auth for asking, uncomment and use:
  // const idToken = req.headers.authorization?.split('Bearer ')[1];
  // if (!idToken) return res.status(401).json({error:'auth required'});
  // try { await require('firebase-admin').auth().verifyIdToken(idToken); next(); }
  // catch(e){ return res.status(401).json({error:'invalid token'}); }
  next();
}

router.post('/', verifyFirebaseToken, async (req, res) => {
  const q = req.body.q || '';
  if (!q) return res.status(400).json({ error: 'Empty question' });

  try {
    // Example request body — adjust per Groq API spec
    const body = {
      model: process.env.GROQ_MODEL || 'gpt-4o-mini', // change as per your access
      messages: [{ role: 'user', content: q }]
    };

    const r = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GROQ_API_KEY}`
      },
      body: JSON.stringify(body)
    });

    if (!r.ok) {
      const text = await r.text();
      console.error('Groq error', r.status, text);
      return res.status(500).json({ error: 'AI provider error' });
    }

    const data = await r.json();
    // Extract answer — depends on provider response shape
    const answer = data.choices?.[0]?.message?.content || data.output || JSON.stringify(data);
    return res.json({ answer });

  } catch (e) {
    console.error('Ask error', e);
    res.status(500).json({ error: 'Server error: ' + e.message });
  }
});

module.exports = router;
