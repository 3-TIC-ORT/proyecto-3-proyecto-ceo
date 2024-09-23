import { config } from 'dotenv';
config()

import cors from 'cors'
import express from 'express'
import  Express  from "express";
import path from 'path';
import { fileURLToPath } from 'url';

// seguridad
import argon2 from 'argon2'
import jsonwebtoken from 'jsonwebtoken'


// modelos
import { Foro } from './model/foros.js';
import { Resumen } from "./model/resumenes.js";
import { FeedbackModel } from "./model/feedback.js";
import { User } from "./model/users.js";
import { objetoPerdido } from './model/objetosPerdidos.js';
import { campusRouter } from './routes/campusRouter.js';

//paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const __parentDir = path.dirname(__dirname);

const __rootDir = path.dirname(__parentDir);

// importante
import { authenticateToken } from './endpoints.js';
import { endpoints } from './endpoints.js';

const app = Express()
app.use(express.json())
app.use(cors())
app.use(express.static(path.join(__rootDir, 'frontend/')));


app.use(function(req, res, next) {
    console.log(chalk.grey('[server], NEW REQUEST:' + req.method + ' ' + req.url));
    next();
})

//rutas
import { resumenesRouter } from './routes/resumenesRoutes.js';
import { forosRouter } from './routes/forosRoute.js';
import { objPerdidosRouter } from './routes/objPerdidosRoute.js';

//colores
import chalk from "chalk";
import { error } from "console";

const SECRET_KEY = process.env.SECRET_KEY

const greenChalk = chalk.greenBright;
const redChalk = chalk.redBright;
const yellowChalk = chalk.yellowBright;
const blueChalk = chalk.cyanBright;


console.log("0-----------------------S-T-A-R-T-I-N-G-----------------------0")
const PORT = process.env.PORT
endpoints(app)


//rutass
app.use('/resumenes', authenticateToken, resumenesRouter)
app.use('/foros', authenticateToken,forosRouter)
app.use('/objetos-perdidos', authenticateToken, objPerdidosRouter)
app.use('/home', campusRouter)


app.get("/users", async (req,res) => {
    try {
        const users = await User.findAll();
        console.log("Corriendo")
        console.log(users)
    } catch (error) {
        console.error(err , "Busqueda no Exitosa")
    }
});

app.get("/", async (req,res) => {
    res.sendFile(path.resolve('frontend', 'LogIn/LogIn.html'))
});

app.listen(PORT, () => {
    try {
        console.log(yellowChalk("Connection Successful!!!!!!!", PORT))
    } catch (error) {
        console.log("Could not connect :((((", err, "ON PORT:", PORT)
    }
})
export { app }