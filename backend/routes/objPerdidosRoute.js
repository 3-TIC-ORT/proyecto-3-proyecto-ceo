import express from 'express'
import { Router } from 'express'
import { fileURLToPath } from 'url';
import path from 'path';
import { app } from '../main.js';

const objPerdidosRouter = Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const __parentDir = path.dirname(__dirname);
const __rootDir = path.dirname(__parentDir);

objPerdidosRouter.get('/objetosPerdidos', (req, res)=>{
    app.use(express.static(path.join(__rootDir, 'frontend/ObjetosPerdidos')));
    res.sendFile(path.join(__rootDir, 'frontend/ObjetosPerdidos/ObjetosPerdidos.html'));
})

export { objPerdidosRouter }