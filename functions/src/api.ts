// import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';

admin.initializeApp();

const router = express.Router();

router.get('/health', (req, res) => {
  return res.json({ message: 'api functions are running!' });
});

router.get('/projects', (req, res) => {
  return res.json([1 , 2 , 3]);
});

router.get('**', (req, res) => {
  return res.status(400).json({ error: 'bad request', code: 400 });
});

export default router;
