import express, { Request, Response } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import multer from 'multer';
import path from 'path';
import { registerUser, getUsers, getUserByEmail } from './routes/FaceRecologin';

const port: number = 5000; 
const app: express.Application = express();

app.use(express.json());
app.use(cors({ origin: '*' }));

const dbURI: string = 'mongodb://127.0.0.1:27017/yourdbname'; 

mongoose.connect(dbURI)
    .then(() => console.log('MongoDB connected successfully'))
    .catch((err: Error) => console.error('MongoDB connection error:', err));

const storage = multer.diskStorage({
    destination: (req: Request, file: Express.Multer.File, cb: Function) => {
        cb(null, 'uploads/');
    },
    filename: (req: Request, file: Express.Multer.File, cb: Function) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

app.use('/uploads', express.static('uploads'));

const upload = multer({ storage });

app.post("/register", upload.single('picture'), registerUser);
app.get("/getUsers", getUsers);
app.get('/getUserByEmail', getUserByEmail);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});