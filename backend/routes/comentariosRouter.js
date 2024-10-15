import express from 'express'
import { Router } from 'express'
import { app } from '../main.js'
import { fileURLToPath } from 'url'
import path from 'path';
import chalk from 'chalk';
import { Comentario } from '../model/comentarios.js';

const redChalk = chalk.red
import { getQueryParams } from '../../frontend/controllers/queryParamsController.js';
import { where } from 'sequelize';
import { constrainedMemory } from 'process';

const comentariosRouter = Router()

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const __parentDir = path.dirname(__dirname);
const __rootDir = path.dirname(__parentDir);

comentariosRouter.get("/get", async (req, res) => {
    try {
        const { idPost, idCreator, seccion } = JSON.parse(req.body);
        console.log("Receiving comentario data...");

        const comentario = await Comentario.findOne({ 
            where: {
                idPost,
                idCreator,
                seccion,
            }
        });
        res.status(201).json(comentario);
    } catch (error) {
        console.error(redChalk("Error getting comentario:"), error);
        res.status(500).json({ message: 'Error getting comentario', error });
    }
})

comentariosRouter.post("/send", async (req, res) => {
    try {
        const { idPost, seccion, contenido } = JSON.parse(req.body);
        const idCreator = req.user.id
        console.log("Receiving comentario data...");

        const comentario = await Comentario.create({idPost, seccion, contenido, idCreator})
        res.status(201).json(comentario);
    } catch (error) {
        console.error(redChalk("Error sending comentario:"), error);
        res.status(500).json({ message: 'Error sending comentario', error });
    }
})

comentariosRouter.get("/delete", async (req, res) => {
    try {
        const { idPost, idUser, contenido, seccion } = JSON.parse(req.body);
        console.log("Receiving comentario data...");
        
        const comentario = await Comentario.destroy({ where: {
            seccion: seccion,
            idPost: idPost,
            idUser: idUser,
            contenido: contenido,
        }});
        res.status(201).json({ message: 'Comentario deleted successfully' });
    } catch (error) {
        res.status(500).send(redChalk('[comentarios] ERROR: Failed to delete comentario:', error))
    }
})