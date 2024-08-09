import { config } from 'dotenv';
config()

import  Express  from "express";
import  express  from "express";
import { User } from "./model/users.js";
import argon2 from 'argon2'
import jsonwebtoken from 'jsonwebtoken'
// import 'dotenv/config'


//colores
import chalk from "chalk";
import exp from "constants";
import { objetosPerdidos } from "./model/objetosPerdidos.js";
import { Foro } from "./model/foros.js";
import { Resumen } from "./model/resumenes.js";
import { FeedbackModel } from "./model/feedback.js";
import { error } from "console";

const SECRET_KEY = process.env.SECRET_KEY

const greenChalk = chalk.greenBright;
const redChalk = chalk.redBright;
const yellowChalk = chalk.yellowBright;
const blueChalk = chalk.cyanBright;

console.log("0-----------------------S-T-A-R-T-I-N-G-----------------------0")
const app = Express()
const PORT = 3000

app.post('/send-register', async (req, res) => {

    const userData = req.body;

    console.log(yellowChalk("Recibiendo user data..."));

    let firstName = userData.firstName;
    let password = await encriptPassword(userData.password)
    let lastName = userData.lastName;
    let gmail = userData.gmail;

    const user = await User.create({firstName: firstName, lastName: lastName, password: password, gmail: gmail})
})

app.post('/send-feedback', async (req, res) => {

    const feedackData = req.body
    console.log(yellowChalk('Recibiendo feedback data...'))

    let score = feedackData.puntaje
    let suggestion = feedackData.sugerencia
    let opinion = feedackData.opinion

    const feedback = await FeedbackModel.create( {puntaje: score, sugerencia: suggestion, opinion: opinion} )
})

app.post('/send-resumen', async (req, res) => {

    const resumenData = req.body
    console.log(yellowChalk('Recibiendo resumen data...'))
    
    let descripcion = resumenData.descripcion
    let titulo = resumenData.titulo
    let archivoPath = resumenData.archivoPath
    let contenido = resumenData.contenido
    let filtros = resumenData.filtros

    const resumen = await Resumen.create( { titulo: titulo, descripcion: descripcion, archivo: archivoPath, contenido: contenido, filtros: filtros })
})

app.post('/send-objetosPerdidos', async (req, res)=>{

    const objetosPerdidosData = req.body
    console.log(yellowChalk("Recibiendo objetosPerididos"))

    let informacion = objetosPerdidosData.infromacion
    let foto = objetosPerdidosData.foto

    const objeto = await objetosPerdidos.create( {informacion: informacion, foto: foto} )
})

app.post('/send-foro', async (req, res)=>{

    const foroData = req.body
    console.log(yellowChalk("Recibiendo forma..."))

    let pregunta = foroData.pregunta
    let foto = foroData.foto
    let textoExplicativo = foroData.textoExplicativo
    let comentarios = foroData.comentarios

    const foro = await Foro.create( {pregunta: pregunta, foto: foto, textoExplicativo: textoExplicativo, comentarios: comentarios} )
})

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
        console.log(yellowChalk("connection successful!!!!!!!", PORT))
    } catch (error) {
        
    }
})


async function encriptPassword(password) {
    try {
        let hash = argon2.hash(password, 5)
        console.log('encripted-password')
        return hash;
    } catch (error) {
        console.error(err, "ERROR =(")
    }
}

async function verifyPassword(hash, password) {
    try {
        if ( await argon2.verify(hash, password)) {
            return true
        } else {
            return false
        }
    } catch (error) {
        console.err(err, "ERROR, no hizo la verificacion")
    }
}

async function authenticateToken(req, res, next) {
    // sacamo el token del header
    const authHeader = req.header['authorization'];
    const token = authHeader && authHeader.split(' ')[1]

    console.log(blueChalk('Authenticating token...'))

    if (token == null) {
        console.log(redChalk('No token!'))
        return error;
    }

    jsonwebtoken.verify(token, SECRET_KEY, (err, user) => {

        console.log(yellowChalk('Authenticating token....'))
        if (err) {
            console.log(redChalk('Invalid token!'))
            return res.sendStatus(403);
        }

        console.log(greenChalk('Authentication successful!!!!'))
        req.user = user;
        next();

    })

}   



export { authenticateToken };
export { greenChalk };
export { yellowChalk };