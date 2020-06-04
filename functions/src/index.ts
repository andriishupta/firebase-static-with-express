import * as functions from 'firebase-functions';
import * as express from 'express';
import * as path from 'path';
import _api from './api'

const _app = express();

_app.use('/api', _api);

_app.get('/', (req, res) => {
  res.setHeader('Cache-control', 'public, max-age=600, s-maxage=1200')
  res.sendFile(path.join(__dirname, '..', '..', 'app', 'index.html'));
});

export const app = functions.https.onRequest(_app);
