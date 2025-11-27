// worker.js - simple self-pinger every 9 minutes
const fetch = (...args) => import('node-fetch').then(({default: f}) => f(...args));
const url = process.env.SELF_URL; // set this env to your service URL

async function ping(){
  try {
    const r = await fetch(url, { method: 'GET' });
    console.log('Pinged', url, 'status', r.status);
  } catch (e) {
    console.error('Ping error', e.message);
  }
}

setInterval(ping, 9 * 60 * 1000); // every 9 minutes
// also ping immediately
ping();
