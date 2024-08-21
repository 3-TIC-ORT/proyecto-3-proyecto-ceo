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
import { objetosPerdidos } from './model/objetosPerdidos.js';
import { campusRouter } from './routes/campusRouter.js';

// importante
const app = Express()
app.use(express.json())
app.use(cors())

//rutas
import { resumenesRouter } from './routes/resumenesRoutes.js';
import { forosRouter } from './routes/forosRoute.js';
import { objPerdidosRouter } from './routes/objPerdidosRoute.js';

//colores
import chalk from "chalk";
import { error } from "console";

//paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const __parentDir = path.dirname(__dirname);

const SECRET_KEY = process.env.SECRET_KEY

const greenChalk = chalk.greenBright;
const redChalk = chalk.redBright;
const yellowChalk = chalk.yellowBright;
const blueChalk = chalk.cyanBright;


console.log("0-----------------------S-T-A-R-T-I-N-G-----------------------0")
const PORT = process.env.PORT

//rutass
app.use('/resumenes', resumenesRouter)
app.use('/foros', forosRouter)
app.use('/objetos-perdidos', objPerdidosRouter)
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

app.listen(PORT, () => {
    try {
        console.log(yellowChalk("Connection Successful!!!!!!!", PORT))
    } catch (error) {
        console.log("Could not connect :((((", err, "ON PORT:", PORT)
    }
})
export { app }