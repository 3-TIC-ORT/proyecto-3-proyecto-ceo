import express from 'express'
import { Router } from 'express'
import { app } from '../main.js'
import { fileURLToPath } from 'url'
import path from 'path';
import chalk from 'chalk';

const redChalk = chalk.red
import { getForos } from '../controllers/forosController.js';

const forosRouter = Router()

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const __parentDir = path.dirname(__dirname);
const __rootDir = path.dirname(__parentDir);

forosRouter.get("/", async (req, res) => {
    try {
        console.log("Loading foros principal")
        const foros = await getForos()
        console.log('foros',foros)
        res.status(200).json(foros)
    } catch (error) {
        res.status(500).send(redChalk('[foro] ERROR: Failed to load foros'))
    }
})

forosRouter.get("/search", (req, res) => {

    res.sendFile(path.join(__rootDir, 'frontend/ForoBusqueda/'))
})

forosRouter.get("/upload", (req, res) => {

    res.sendFile(path.join(__rootDir, 'frontend/ForoUpload/ForoUpload.html'))
})

forosRouter.get("/open", (req, res) => {

    res.sendFile(path.join(__rootDir, 'frontend/ForoVisualizacion/ForoVisualizacion.html'))
})

export { forosRouter }