// import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';

admin.initializeApp();

const router = express.Router();

router.get('/health', (req, res) => {
  return res.json({ message: 'Api functions are running!' });
});

router.get('/projects', (req, res) => {
  return res.json([1 , 2 , 3]);
});

export default router;
