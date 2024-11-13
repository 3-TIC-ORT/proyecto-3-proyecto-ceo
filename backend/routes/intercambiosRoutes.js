import express from 'express'
import { Router } from 'express'
import { app } from '../main.js'
import { fileURLToPath } from 'url'
import path from 'path';

const intercambiosRouter = Router();

import chalk from 'chalk';
import { Intercambio } from '../model/intercambio.js';

//controllers
import { deletePost } from '../controllers/deletePostController.js';
import { findUserById } from '../controllers/userIdFinderController.js';
import { getIntercambios } from '../controllers/intercambiosController.js';

intercambiosRouter.get('/', async (req, res)=>{
    try {
        console.log("Loading intercambio principal")
        const intercambio = await getIntercambios()

        res.status(200).json(intercambio)
    } catch (error) {
        console.log(chalk.red(error))
        res.status(500).send('[objetos] ERROR: Failed to load intercambio')
    }
});


intercambiosRouter.get("/visualizar", async (req, res) => {
    console.log('Loading selected intercambio....')
    const id = req.query.id
    console.log('intercambio ID: ', id)
    
    const intercambio = await Intercambio.findOne({
        where: {
            id
        }
    });

    if (!intercambio) {
        console.log('No existe ese intercambio')
        res.status(400).send('No existe el intercambio')
    }

    try {
        console.log('[objeto] Data:', intercambio)
        res.status(200).json(intercambio)
    } catch (error) {
        res.status(500).send('Failed to send the intercambio...')
    }
})

intercambiosRouter.get('/user', async (req, res) => {
    const id = req.query.id
    console.log(' USER ID: ', id)

    const user = await findUserById(id)

    res.status(200).json(user);
})

intercambiosRouter.post('/delete', async (req, res) => {
    const id = req.query.id;
    const model = Intercambio;
    console.log(' POST ID: ', id);
    try {
        const deletedPost = await deletePost(id, model)
        res.status(200).send('[intercambio] Succesfuly deleted post.')
    } catch (error) {
        res.status(500).send('[intercambio] Failed to delete post.')
    }
    
})

export { intercambiosRouter }