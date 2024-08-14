import express from 'express'
import { Router } from 'express'
import path from 'path';

const forosRouter = Router()

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const __parentDir = path.dirname(__dirname);
const __rootDir = path.dirname(__parentDir);

forosRouter.get("/", (req, res) => {

    app.use(express.static(path.join(__rootDir, 'frontend/Foro')));
    res.sendFile(path.join(__rootDir, 'frontend/Foro/Foro.html'))
})

forosRouter.get("/search", (req, res) => {

    app.use(express.static(path.join(__rootDir, 'frontend/ForoBusqueda')));
    res.sendFile(path.join(__rootDir, 'frontend/ForoBusqueda/ForoBusqueda.html'))
})

forosRouter.get("/upload", (req, res) => {

    app.use(express.static(path.join(__rootDir, 'frontend/ForoUpload')));
    res.sendFile(path.join(__rootDir, 'frontend/ForoUpload/ForoUpload.html'))
})

forosRouter.get("/open", (req, res) => {

    app.use(express.static(path.join(__rootDir, 'frontend/ForoVisualizacion')));
    res.sendFile(path.join(__rootDir, 'frontend/ForoVisualizacion/ForoVisualizacion.html'))
})

export { forosRouter }