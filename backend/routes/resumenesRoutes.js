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

//controller
import { getResumenes } from '../controllers/resumenesController.js';
import { json } from 'sequelize';

resumenesRouter.get('/', async (req, res) => {
    try {
        console.log("Loading resumenes principal")
        const resumenes = await getResumenes()
        res.status(200).json(resumenes)
    } catch (error) {
        res.status(500).send('[resumenes] ERROR: Failed to load resumenes')
    }
})

resumenesRouter.get('/upload', async (req, res)=> {
    console.log("Loading resumenes upload")

    res.sendFile(path.join(__rootDir, 'frontend/ResumenesUpload/ResumenesUpload.html'));
})
export { resumenesRouter }