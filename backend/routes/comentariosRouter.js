import express from 'express'
import { Router } from 'express'
import { app } from '../main.js'
import { fileURLToPath } from 'url'
import path from 'path';
import chalk from 'chalk';
import { Comentario } from '../model/comentarios.js';

const redChalk = chalk.red
import { getQueryParams } from '../../controllers/queryParamsController.js';
import { where } from 'sequelize';
import { findUserById } from '../controllers/userIdFinderController.js';

const comentariosRouter = Router()

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const __parentDir = path.dirname(__dirname);
const __rootDir = path.dirname(__parentDir);

comentariosRouter.get("/fetch", async (req, res) => {
    try {
        const idPost = req.query.idPost;
        const seccion = req.query.seccion;

        console.log("Receiving comentario data...");
        const comentario = await Comentario.findAll({ 
            where: {
                idPost,
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
        const { idPost, seccion, contenido } = req.body;
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

comentariosRouter.get("/user", async (req, res) => {
    try {
        const ID = req.query.id
        const foundUser = await findUserById(ID)
        res.status(201).json(foundUser);
    } catch (error) {
        res.status(500).send(redChalk('[comentarios] ERROR: Failed to fetch user IN comentario:', error))
    }
})

export { comentariosRouter }