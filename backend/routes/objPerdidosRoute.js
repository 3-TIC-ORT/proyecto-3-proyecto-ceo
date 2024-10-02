import express from 'express'
import { Router } from 'express'
import { app } from '../main.js'
import { fileURLToPath } from 'url'
import path from 'path';
import { getObjetosPerdidos } from '../controllers/objPerdController.js';

const objPerdidosRouter = Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const __parentDir = path.dirname(__dirname);
const __rootDir = path.dirname(__parentDir);
import chalk from 'chalk';

objPerdidosRouter.get('/', async (req, res)=>{
    try {
        console.log("Loading objetos principal")
        const objetos = await getObjetosPerdidos()

        res.status(200).json(objetos)
    } catch (error) {
        console.log(chalk.red(error))
        res.status(500).send('[objetos] ERROR: Failed to load objetos')
    }
});

objPerdidosRouter.get("/upload", (req, res) => {

    res.sendFile(path.join(__rootDir, 'frontend/ObjetosPerdidosUpload/ObjetosPerdidosUpload.html'))
})

export { objPerdidosRouter }