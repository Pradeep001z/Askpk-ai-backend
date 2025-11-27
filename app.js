require('dotenv').config();
const express = require('express');
const cors = require('cors');

const initFirebase = require('./utils/firebaseAdmin');
initFirebase(); // initialize firebase admin

const askRoute = require('./routes/ask');
const authRoute = require('./routes/auth');
const shortRoute = require('./routes/short');

const app = express();
app.use(cors());
app.use(express.json());

// routes
app.use('/api/ask', askRoute);
app.use('/api/auth', authRoute);
app.use('/api/shorten', shortRoute);

// redirect endpoint for /s/:id
const shortRedirect = require('./routes/shortRedirect');
app.use('/s', shortRedirect);

// health
app.get('/', (req, res) => res.json({ ok: true, service: 'askpk-backend' }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Backend listening on ${PORT}`));
