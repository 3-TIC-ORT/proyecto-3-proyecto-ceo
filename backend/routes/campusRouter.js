import express from 'express'
import { Router } from 'express'
import { app } from '../main.js'
import { fileURLToPath } from 'url'
import path from 'path'

const campusRouter = Router()

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const __parentDir = path.dirname(__dirname);
const __rootDir = path.dirname(__parentDir);

campusRouter.get('/', (req, res) => {
    
    app.use(express.static(path.join(__rootDir, 'frontend/LogIn')));
    res.sendFile(path.join(__rootDir, 'frontend/LogIn/LogIn.html'))

})
export { campusRouter }

