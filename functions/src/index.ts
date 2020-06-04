import * as functions from 'firebase-functions';
import * as express from 'express';
import * as path from 'path';
import * as fs from 'fs';
import _api from './api'

const _app = express();

const html = fs.readFileSync(path.join(__dirname, 'index.html'));

_app.use('/api', _api);

_app.get('/', (req, res) => {
  res.setHeader('cache-control', 'public, max-age=600, s-maxage=1200');
  res.setHeader('content-type', 'text/html');
  res.end(html);
});

export const app = functions.https.onRequest(_app);
