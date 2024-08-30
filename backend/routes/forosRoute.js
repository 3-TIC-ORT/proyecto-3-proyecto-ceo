import express from 'express'
import { Router } from 'express'
import { app } from '../main.js'
import { fileURLToPath } from 'url'
import path from 'path';


const forosRouter = Router()

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const __parentDir = path.dirname(__dirname);
const __rootDir = path.dirname(__parentDir);

forosRouter.get("/", (req, res) => {
    
    res.sendFile(path.join(__rootDir, 'frontend/Foro/'))
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