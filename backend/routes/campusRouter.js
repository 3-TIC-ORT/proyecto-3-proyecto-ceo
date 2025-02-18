import express from 'express'
import { Router } from 'express'
import { app } from '../main.js'
import { fileURLToPath } from 'url'
import path from 'path'

const campusRouter = Router()

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const __parentDir = path.dirname(__dirname);
const __rootDir = path.dirname(__parentDir);

campusRouter.get('/', (req, res) => {

    console.log(path.join(__rootDir, 'frontend/PaginaInicio/index.html'))
    res.sendFile(path.join(__rootDir, 'frontend/PaginaInicio/index.html'));
})

campusRouter.get('/register', (req, res) => {
    res.sendFile(path.join(__rootDir, 'frontend/PaginaInicio/Registrarse/index.html'));
})

campusRouter.get('/login', (req, res) => {
    res.sendFile(path.join(__rootDir, 'frontend/PaginaInicio/login/index.html'));
})
campusRouter.get('/calificanos', (req, res) => {
    res.sendFile(path.join(__rootDir, 'frontend/Calificanos/Calificanos.html'));
})

// Rutas adicionales necesarias para el correcto funcionamiento del frontend
campusRouter.get('/resumenes', (req, res) => {
    res.sendFile(path.join(__rootDir, 'frontend/ResumenesPrincipal/index.html'));
})

campusRouter.get('/resumenes/upload', (req, res) => {
    res.sendFile(path.join(__rootDir, 'frontend/ResumenesPrincipal/uploadResumenes/index.html'));
})

campusRouter.get('/resumenes/visualizacion', (req, res) => {
    res.sendFile(path.join(__rootDir, 'frontend/ResumenesPrincipal/visualizacionResumenes/index.html'));
})

campusRouter.get('/foros', (req, res) => {
    res.sendFile(path.join(__rootDir, 'frontend/Foro/index.html'));
})

campusRouter.get('/intercambios', (req, res) => {
    res.sendFile(path.join(__rootDir, 'frontend/Intercambios/index.html'));
})

campusRouter.get('/objetos-perdidos', (req, res) => {
    res.sendFile(path.join(__rootDir, 'frontend/ObjetosPerdidos/index.html'));
})

// Servir archivos estáticos para imágenes, estilos y scripts
campusRouter.use('/img', express.static(path.join(__rootDir, 'frontend/img')));
campusRouter.use('/styles', express.static(path.join(__rootDir, 'frontend/styles')));
campusRouter.use('/global', express.static(path.join(__rootDir, 'frontend/globalStyle.css')));
campusRouter.use('/controllers', express.static(path.join(__rootDir, 'frontend/controllers')));

campusRouter.use('/js/paginaInicio', express.static(path.join(__rootDir, 'frontend/PaginaInicio/main.js')));
campusRouter.use('/js/paginaInicio/registrarse', express.static(path.join(__rootDir, 'frontend/PaginaInicio/Registrarse/api-register.js')));
campusRouter.use('/js/resumenes', express.static(path.join(__rootDir, 'frontend/ResumenesPrincipal/main.js')));
campusRouter.use('/js/resumenes/upload', express.static(path.join(__rootDir, 'frontend/ResumenesPrincipal/uploadResumenes/main.js')));
campusRouter.use('/js/resumenes/visualizacion', express.static(path.join(__rootDir, 'frontend/ResumenesPrincipal/visualizacionResumenes/main.js')));
campusRouter.use('/js/foros', express.static(path.join(__rootDir, 'frontend/Foro/main.js')));
campusRouter.use('/js/intercambios', express.static(path.join(__rootDir, 'frontend/Intercambios/main.js')));
campusRouter.use('/js/objetosPerdidos', express.static(path.join(__rootDir, 'frontend/ObjetosPerdidos/main.js')));



export { campusRouter }

