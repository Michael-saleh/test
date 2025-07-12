import { MongoClient } from 'mongodb';
import { config } from "dotenv";
config();

const uri = process.env.uri;
const client = new MongoClient(uri);

let db;

export async function connectToMongo() {
  await client.connect();
  db = client.db('pc-store');
  console.log('MongoDB connected');
}

export function getDb() {
  return db;
}