import argon2 from 'argon2'
import { User } from './model/users.js';
import { Foro } from './model/foros.js';
import { Resumen } from './model/resumenes.js';
import { objetosPerdidos } from './model/objetosPerdidos.js';
import { FeedbackModel } from './model/feedback.js';
import { Intercambio } from './model/intercambio.js';
import { Console, error } from 'console';


import chalk from "chalk";
import { where } from 'sequelize';

const blueChalk = chalk.blue
const greenChalk = chalk.greenBright;
const redChalk = chalk.redBright;
const yellowChalk = chalk.yellowBright;

// functiones
async function encriptPassword(password) {
    try {
        let hash = argon2.hash(password, 5)
        console.log('encripted-password')
        return hash;
    } catch (error) {
        console.error(error, "ERROR =(")
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
        console.err(error, "ERROR, no paso la verificacion")
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

// endpoitns
export async function endpoints(app) {

    app.post('/login', async (req, res) => {
        const userData = req.body
        const password = userData.password
        const name = userData.firstName
        const gmail = userData.gmail

        console.log('Running login')
        console.log(`Searching for ${name} with gmail: ${gmail}`)

        const user = await User.findOne({
            where: {
              firstName: name,
              gmail: gmail
            }
        });    

        if (!user) {
            console.log(error, '[LOGIN] User not found :((')
        }

        if (verifyPassword(user.password, password)) {
            console.log(greenChalk('User is now logged-in!!!!!!'))
        }

        console.log(user)
        res.send('Found user!').status(200)
    })

    app.post('/registers', async (req, res) => {
        try {
            const userData = req.body;
            console.log("Recibiendo user data...");

            let firstName = userData.firstName;
            let password = await encriptPassword("pepe");
            let lastName = userData.lastName;
            let gmail = userData.gmail;
        
            const user = await User.create({firstName: firstName, password: password, lastName: lastName, gmail: gmail});
            res.status(200).json({ message: 'Usuario creado exitosamente'});
        } catch (error) {
            console.error("Error al crear el usuario:", error);
            res.status(500).json({ message: 'Error al crear el usuario', error });
        }
    });

    app.post('/intercambios', async (req, res) => {
        try{
            const intercambioData = req.body
            console.log("Recibiendo intecambio data");

            let informacion = intercambioData.informacion;
            let titulo = intercambioData.titulo;
            let respuestas = intercambioData.respuestas;
            let foto = intercambioData.foto

            const intecambio = await Intercambio.create({informacion: informacion, titulo: titulo, respuestas: respuestas, foto:foto});
            res.status(200).json({ message: 'Intercambio creado exitosamente'});
        } catch(error) {
            console.error("Error al crear el usuario:", error);
            res.status(500).json({ message: 'Error al crear el usuario', error });
        }
    });

    app.post('/feedbacks', async (req, res) => {
        try {
            const feedbackData = req.body;
            console.log("Recibiendo feedback data...");

            let score = feedbackData.puntaje;
            let suggestion = feedbackData.sugerencia;
            let opinion = feedbackData.opinion;
        
            const feedback = await FeedbackModel.create({puntaje: score, sugerencia: suggestion, opinion: opinion});
            res.status(201).json({ message: 'Feedback enviado exitosamente'});
        } catch (error) {
            console.error("Error al enviar el feedback:", error);
            res.status(500).json({ message: 'Error al enviar el feedback', error });
        }
    });

    app.post('/resumen', async (req, res) => {
        try {
            const resumenData = req.body;
            console.log("Recibiendo resumen data...");

            let descripcion = resumenData.descripcion;
            let titulo = resumenData.titulo;
            let archivo = resumenData.archivo;
            let contenido = resumenData.contenido;
            let filtros = resumenData.filtros;
        
            const resumen = await Resumen.create({titulo: titulo, descripcion: descripcion, archivo: archivo, contenido: contenido, filtros: filtros});
            res.status(201).json({ message: 'Resumen enviado exitosamente'});
        } catch (error) {
            console.error("Error al enviar el resumen:", error);
            res.status(500).json({ message: 'Error al enviar el resumen', error });
        }
    });

    app.post('/objetos-perdidos-handling', async (req, res) => {
        try {
            const objetosPerdidosData = req.body;
            console.log("Recibiendo objetosPerdidos data...");

            let informacion = objetosPerdidosData.informacion;
            let foto = objetosPerdidosData.foto;
        
            const objeto = await objetosPerdidos.create({informacion: informacion, foto: foto});
            res.status(201).json({ message: 'Objeto perdido registrado exitosamente'});
        } catch (error) {
            console.error("Error al registrar el objeto perdido:", error);
            res.status(500).json({ message: 'Error al registrar el objeto perdido', error });
        }
    });

    app.post('/send-foro', async (req, res) => {
        try {
            const foroData = req.body;
            console.log("Recibiendo foro data...");

            let pregunta = foroData.pregunta;
            let foto = foroData.foto;
            let textoExplicativo = foroData.textoExplicativo;
            let comentarios = foroData.comentarios;
        
            const foro = await Foro.create({pregunta: pregunta, foto: foto, textoExplicativo: textoExplicativo, comentarios: comentarios});
            res.status(201).json({ message: 'Foro creado exitosamente'});
        } catch (error) {
            console.error("Error al crear el foro:", error);
            res.status(500).json({ message: 'Error al crear el foro', error });
        }
    });
}

export {  authenticateToken }
