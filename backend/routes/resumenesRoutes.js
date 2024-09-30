import express from 'express'
import { Router } from 'express'
import { app } from '../main.js'
import { fileURLToPath } from 'url'
import path from 'path';
import { authenticateToken } from '../endpoints.js';
import { Resumen } from '../model/resumenes.js';
import chalk from 'chalk';

const resumenesRouter = Router()

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const __parentDir = path.dirname(__dirname);
const __rootDir = path.dirname(__parentDir);

//controller
import { getResumenes } from '../controllers/resumenesController.js';
import { json, where } from 'sequelize';

resumenesRouter.get('/', async (req, res) => {
    try {
        console.log("Loading resumenes principal")
        const resumenes = await getResumenes()
        res.status(200).json(resumenes)
    } catch (error) {
        console.log(chalk.red(error))
        res.status(500).send('[resumenes] ERROR: Failed to load resumenes')
    }
})

resumenesRouter.get('/upload', async (req, res)=> {
    console.log("Loading resumenes upload")

    res.sendFile(path.join(__rootDir, 'frontend/ResumenesUpload/ResumenesUpload.html'));
})

resumenesRouter.get('/visualizar', async (req, res)=>{
    console.log("loading visualizacion de resumenes");

    const id = req.query.id
    console.log('id:', id)
    
    const resumen = await Resumen.findOne({
        where: { 
            id
        }
    });

    console.log(resumen)

    try {

        res.status(200).json(resumen);
    } catch (error) {
        console.error('Failed visualizacion');
        res.status(500).json({message: 'failed vizualizacion'});
    }
})

export { resumenesRouter }