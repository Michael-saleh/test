import express from 'express';
import { connectToMongo } from './db.js';
import userRoutes from './routes/userRoutes.js';
import { config } from "dotenv";
import cors from "cors";


config();

const PORT = process.env.PORT;

const app = express();
app.use(express.json());
app.use(cors());

await connectToMongo();

app.use('/api/users', userRoutes);


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
