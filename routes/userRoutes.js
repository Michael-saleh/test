import express from 'express';
import { getDb } from '../db.js';

const router = express.Router();
const collectionName = 'users';

// Insert one user
router.post('/insert', async (req, res) => {
  const result = await getDb().collection(collectionName).insertOne(req.body);
  res.json(result);
});

// Insert many users
router.post('/insertMany', async (req, res) => {
  const result = await getDb().collection(collectionName).insertMany(req.body);
  res.json(result);
});

// Find all users
router.get('/findAll', async (req, res) => {
  const users = await getDb().collection(collectionName).find().toArray();
  res.json(users);
});

// Find one user
router.post('/findOneByEmail', async (req, res) => {
  const user = await getDb().collection(collectionName).findOne(
  { email: req.body.email },
  {
    projection: {
      username: 1,
      birthYear: 1, // projection values are 1 or 0 only; -1 is not allowed
      email: 1,
      _id: 0
    }
  }
);
  res.json(user);
});

// Delete one user
router.delete('/deleteByEmail', async (req, res) => {
  const result = await getDb().collection(collectionName).deleteOne({ email: req.body.email });
  res.json(result);
});

// Delete many users
router.delete('/deleteAll', async (req, res) => {
  const result = await getDb().collection(collectionName).deleteMany({ });
  res.json(result);
});

// Aggregation: extract language from settings
router.get('/aggregate', async (req, res) => {
const result = await getDb().collection(collectionName).aggregate([
    {
        $group: {
            _id: "$firstName",
            count: { $sum: 1 }
        }
    },
    {
        $project: {
            _id: 0,
            firstName: "$_id",
            count: 1
        }
    }
]).toArray();
res.json(result);
});

export default router;
