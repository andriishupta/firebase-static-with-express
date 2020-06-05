import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as exphbs from 'express-handlebars';

import {
  getDatabaseRules,
  getResume,
  Resume
} from './database';
import { getProfilePhoto } from './storage';

// local auth: export GOOGLE_APPLICATION_CREDENTIALS=%FILE_PATH_TO_PRIVATE_KEY%
admin.initializeApp(functions.config().firebase);
const db = admin.database();
const storage = admin.storage();

const _app = express();
_app.engine('handlebars', exphbs());
_app.set('view engine', 'handlebars');

/** API */
_app.get('/api/rules', async (req, res) => {
  return res.json(await getDatabaseRules(db));
});

_app.get('/api/resume', async (req, res) => {
  return res.json(await getResume(db));
});

_app.get('/api/profile-photo', async (req, res) => {
  return res.send(await getProfilePhoto(storage, { action: 'read', expires: Date.now() + 700 }));
});

_app.get('/api/**', (req, res) => {
  return res.status(400).json({ error: 'bad request', code: 400 });
});

/** Index */
_app.get('/', async (req, res) => {
  res.setHeader('cache-control', 'public, max-age=600');

  const resume: Resume = await getResume(db);
  const profilePhoto =  await (process.env.NODE_ENV
    ? getProfilePhoto(storage, { action: 'read', expires: Date.now() + 700 })
    : Promise.resolve('favicon.ico'));

  res.render('resume', {
    resume,
    profilePhoto,
  } as { resume : Resume } & { profilePhoto: string });
});


_app.get('**', (req, res) => {
  res.render('404');
});

export const app = functions.https.onRequest(_app);
