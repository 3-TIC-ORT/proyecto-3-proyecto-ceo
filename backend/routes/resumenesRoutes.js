import express from 'express'
import { Router } from 'express'
import { app } from '../main.js'
import { fileURLToPath } from 'url'
import path from 'path';

const resumenesRouter = Router()

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const __parentDir = path.dirname(__dirname);
const __rootDir = path.dirname(__parentDir);

resumenesRouter.get('/', (req, res)=>{
    console.log("Loading resumenes principal")
    app.use(express.static(path.join(__rootDir, 'frontend/ResumenesPrincipal')));
    res.sendFile(path.join(__rootDir, 'frontend/ResumenesPrincipal/ResumenesPrincipal.html'));
})
resumenesRouter.get('/upload', (req, res)=>{
    console.log("Loading resumenes upload")
    app.use(express.static(path.join(__rootDir, 'frontend/ResumenesUpload')));
    res.sendFile(path.join(__rootDir, 'frontend/ResumenesUpload/ResumenesUpload.html'));
})
export { resumenesRouter }