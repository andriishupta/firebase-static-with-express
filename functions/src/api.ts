import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';
const router = express.Router();

admin.initializeApp(functions.config().firebase);
const db = admin.database();
const projects = db.ref('projects');

router.get('/health', async (req, res) => {
  res.end(await db.getRules());
  return;
});

router.get('/projects', async (req, res) => {
  return res.json(await projects.once('value'));
});

router.get('**', (req, res) => {
  return res.status(400).json({ error: 'bad request', code: 400 });
});

export default router;
