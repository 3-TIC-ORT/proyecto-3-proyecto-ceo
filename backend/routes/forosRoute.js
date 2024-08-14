import express from 'express'
import { Router } from 'express'
import path from 'path';

const forosRouter = Router()

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const __parentDir = path.dirname(__dirname);
const __rootDir = path.dirname(__parentDir);

forosRouter.get('/', (req, res) => {
    app.use(express.static(path.join(__rootDir, '/frontend/Foro')));
})

export { forosRouter }