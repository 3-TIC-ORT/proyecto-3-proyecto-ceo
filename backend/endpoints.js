import argon2 from 'argon2';
import jsonwebtoken from 'jsonwebtoken';
import multer from 'multer';
import path from 'path';
import { User } from './model/users.js';
import { Foro } from './model/foros.js';
import { Resumen } from './model/resumenes.js';
import { objetosPerdidos } from './model/objetosPerdidos.js';
import { FeedbackModel } from './model/feedback.js';
import { Intercambio } from './model/intercambio.js';
import express from 'express';
import bodyParser from 'body-parser';
import chalk from 'chalk';

const greenChalk = chalk.greenBright;
const redChalk = chalk.redBright;
const yellowChalk = chalk.yellowBright;
const blueChalk = chalk.cyanBright;

const app = express();

app.use(bodyParser.json());

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, 'uploads');
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath);
        }
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

async function encriptPassword(password) {
    try {
        let hash = await argon2.hash(password, { type: argon2.argon2id, saltLength: 16 });
        console.log('Password encrypted successfully');
        return hash;
    } catch (error) {
        console.error("Error encrypting password:", error);
    }
}

async function verifyPassword(hash, password) {
    try {
        if (await argon2.verify(hash, password)) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error("Error verifying password:", error);
    }
}

async function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    console.log('Authenticating token...');

    if (token == null) {
        console.log('No token!');
        return res.sendStatus(401);
    }

    jsonwebtoken.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            console.log('Invalid token!');
            return res.sendStatus(403);
        }

        console.log('Authentication successful!');
        req.user = user;
        next();
    });
}

export async function endpoints(app) {
    app.post('/send-register', async (req, res) => {
        try {
            const userData = req.body;
            console.log("Receiving user data...");

            let firstName = userData.firstName;
            let password = await encriptPassword(userData.password);
            let lastName = userData.lastName;
            let gmail = userData.gmail;
        
            const user = await User.create({ firstName: firstName, lastName: lastName, password: password, gmail: gmail });
            res.status(200).json({ message: 'User created successfully' });
        } catch (error) {
            console.error("Error creating user:", error);
            res.status(500).json({ message: 'Error creating user', error });
        }
    });

    app.post('/send-intercambio', upload.single('foto'), async (req, res) => {
        try {
            const intercambioData = req.body;
            console.log("Receiving intercambio data");

            let informacion = intercambioData.informacion;
            let titulo = intercambioData.titulo
            let respuestas = intercambioData.respuestas
            let foto = req.file ? req.file.filename : null;

            const intercambio = await Intercambio.create({ informacion: informacion, titulo: titulo, respuestas: respuestas, foto: foto });
            res.status(200).json({ message: 'Intercambio created successfully' });
        } catch (error) {
            console.error("Error creating intercambio:", error);
            res.status(500).json({ message: 'Error creating intercambio', error });
        }
    });

    app.post('/send-feedback', async (req, res) => {
        try {
            const feedbackData = req.body;
            console.log("Receiving feedback data...");

            let puntaje = feedbackData.puntaje;
            if (puntaje  < 1 || puntaje > 5){
                res.status(500).json({ message: 'Puntaje must be between 1 and 5'})
            }
            let sugerencia = feedbackData.sugerencia;
            let opinion = feedbackData.opinion;
        
            const feedback = await FeedbackModel.create({ puntaje: puntaje, sugerencia: sugerencia, opinion: opinion });
            res.status(201).json({ message: 'Feedback sent successfully' });
        } catch (error) {
            console.error("Error sending feedback:", error);
            res.status(500).json({ message: 'Error sending feedback', error });
        }
    });

    app.post('/send-resumen', upload.single('archivo'), async (req, res) => {
        try {
            const resumenData = req.body;
            console.log("Receiving resumen data...");

            let descripcion = resumenData.descripcion;
            let contenido = resumenData.contenido;
            let titulo = resumenData.titulo;
            let filtros = resumenData.filtros;
            let archivo = req.file ? req.file.filename : null;
        
            const resumen = await Resumen.create({ titulo: titulo, descripcion: descripcion, archivo: archivo, contenido: contenido, filtros: filtros });
            res.status(201).json({ message: 'Resumen sent successfully' });
        } catch (error) {
            console.error("Error sending resumen:", error);
            res.status(500).json({ message: 'Error sending resumen', error });
        }
    });

    app.post('/send-objetosPerdidos', upload.single('foto'), async (req, res) => {
        try {
            const objetosPerdidosData = req.body;
            console.log("Receiving objetosPerdidos data...");

            let informacion = objetosPerdidosData.informacion;
            let foto = req.file ? req.file.filename : null;
        
            const objeto = await objetosPerdidos.create({ informacion: informacion, foto: foto });
            res.status(201).json({ message: 'Objeto perdido registered successfully' });
        } catch (error) {
            console.error("Error registering objeto perdido:", error);
            res.status(500).json({ message: 'Error registering objeto perdido', error });
        }
    });

    app.post('/send-foro', upload.single('foto'), async (req, res) => {
        try {
            const foroData = req.body;
            console.log("Receiving foro data...");

            let pregunta = foroData.pregunta;
            let textoExplicativo = foroData.textoExplicativo;
            let comentarios = foroData.comentarios;
            let foto = req.file ? req.file.filename : null;
        
            const foro = await Foro.create({ pregunta: pregunta, foto: foto, textoExplicativo: textoExplicativo, comentarios: comentarios });
            res.status(201).json({ message: 'Foro created successfully' });
        } catch (error) {
            console.error("Error creating foro:", error);
            res.status(500).json({ message: 'Error creating foro', error });
        }
    });
}

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(redChalk(`Server is running on port ${PORT}`));
});

export { authenticateToken };
