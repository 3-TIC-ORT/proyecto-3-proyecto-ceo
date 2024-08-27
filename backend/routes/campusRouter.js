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
    console.log(path.join(__rootDir, 'frontend/PaginaInicio/PaginaInicio.html'))
    res.sendFile(path.join(__rootDir, 'frontend/PaginaInicio/PaginaInicio.html'));
})

campusRouter.get('/register', (req, res) => {
    
    res.sendFile(path.join(__rootDir, 'frontend/Registrarse/Registrarse.html'));
})

campusRouter.get('/login', (req, res) => {
    
    res.sendFile(path.join(__rootDir, 'frontend/LogIn/LogIn.html'));
})
campusRouter.get('/calificanos', (req, res) => {
    
    res.sendFile(path.join(__rootDir, 'frontend/Calificanos/Calificanos.html'));
})

export { campusRouter }

