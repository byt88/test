// Node-style Netlify Function
const querystring = require('querystring');

exports.handler = async function(event, context) {
  // Wir erwarten application/x-www-form-urlencoded POST
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  // parse body (Netlify liefert als string)
  const body = querystring.parse(event.body || '');

  const username = (body.username || '').toString();
  const password = (body.password || '').toString();

  // Voreingestellte "gültige" Credentials (ändern falls nötig)
  const VALID_USER = 'testuser';
  const VALID_PASS = 'S3cret!';

  if (username === VALID_USER && password === VALID_PASS) {
    // Erfolgstext (Hydra sucht üblicherweise nach "Invalid credentials" als FEHLER-String)
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'text/plain' },
      body: 'Welcome, authenticated user'
    };
  }

  // FEHLER-String — wichtig für hydra http-post-form: benutze diesen als "Fail string"
  return {
    statusCode: 200,
    headers: { 'Content-Type': 'text/plain' },
    body: 'Invalid credentials'
  };
};
