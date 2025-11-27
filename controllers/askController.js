const axios = require('axios');

const GROQ_API_URL = process.env.GROQ_API_URL;
const GROQ_API_KEY = process.env.GROQ_API_KEY;

async function askGroq(question) {
  if (!GROQ_API_KEY || !GROQ_API_URL) {
    throw new Error('Missing GROQ_API_KEY or GROQ_API_URL in env');
  }

  // Example payload — adapt to actual Groq API fields per their docs.
  const payload = {
    model: "llama3-8b-instruct", // adjust if different
    messages: [{ role: "user", content: question }]
  };

  const headers = {
    Authorization: `Bearer ${GROQ_API_KEY}`,
    'Content-Type': 'application/json'
  };

  const resp = await axios.post(GROQ_API_URL, payload, { headers, timeout: 60000 });
  // adjust parsing according to actual response shape
  const content = resp.data?.choices?.[0]?.message?.content || resp.data?.result || JSON.stringify(resp.data);
  return content;
}

module.exports = { askGroq };
