import express from 'express'
import { Router } from 'express'
import { app } from '../main.js'
import { fileURLToPath } from 'url'
import path from 'path';
import { authenticateToken } from '../endpoints.js';

const resumenesRouter = Router()

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const __parentDir = path.dirname(__dirname);
const __rootDir = path.dirname(__parentDir);

resumenesRouter.get('/', (req, res) => {
    console.log("Loading resumenes principal")
    res.sendFile(path.join(__rootDir, 'frontend/ResumenesPrincipal/index.html'))
})

resumenesRouter.get('/upload', (req, res)=> {
    console.log("Loading resumenes upload")

    res.sendFile(path.join(__rootDir, 'frontend/ResumenesUpload/ResumenesUpload.html'));
})
export { resumenesRouter }