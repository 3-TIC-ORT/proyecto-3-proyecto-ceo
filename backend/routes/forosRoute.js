import express from 'express'
import { Router } from 'express'
import { app } from '../main.js'
import { fileURLToPath } from 'url'
import path from 'path';
import chalk from 'chalk';
import { Foro } from '../model/foros.js';

const redChalk = chalk.red
import { getForos } from '../controllers/forosController.js';
import { getQueryParams } from '../../frontend/controllers/detailsPageController.js';

const forosRouter = Router()

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const __parentDir = path.dirname(__dirname);
const __rootDir = path.dirname(__parentDir);

forosRouter.get("/", async (req, res) => {
    try {
        console.log("Loading foros principal...")
        const foros = await getForos()
        res.status(200).json(foros)
    } catch (error) {
        res.status(500).send(redChalk('[foro] ERROR: Failed to load foros'))
    }
})

forosRouter.get("/search", async (req, res) => {

})

forosRouter.get("/upload", async (req, res) => {

})

forosRouter.get("/open", async (req, res) => {
    console.log('Loading selected pregunta....')
    const id = req.query.id
    console.log('ID: ', id)
    
    const pregunta = await Foro.findOne({
        where: {
            id
        }
    });

    if (!pregunta) {
        console.log('No existe esa pregunta')
        res.status(400).send('No existe la pregunta')
    }

    try {
        console.log('Data: ', pregunta)
        res.status(200).json(pregunta)
    } catch (error) {
        res.status(500).send('Failed to send the pregunta...')
    }
})

export { forosRouter }