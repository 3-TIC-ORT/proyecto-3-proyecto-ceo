import argon2 from 'argon2';
import jsonwebtoken from 'jsonwebtoken';
import multer from 'multer';
import path, { dirname } from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
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

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(bodyParser.json());

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, 'uploads');
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath);
        }
        cb(null, uploadPath);
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

const SECRET_KEY = process.env.SECRET_KEY;

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

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(gmail)){
                console.error('Invalid email format');
            }
            const user = await User.create({ firstName: firstName, lastName: lastName, password: password, gmail: gmail });
            res.status(200).json({ message: 'User created successfully' });
        } catch (error) {
            console.error("Error creating user:", error);
            res.status(500).json({ message: 'Error creating user', error });
        }
    });

    app.post('/send-intercambio', upload.fields([{ name: 'foto', maxCount: 1 }]), async (req, res) => {
        try {
            const intercambioData = req.body;
            console.log("Receiving intercambio data");

            let informacion = intercambioData.informacion;
            let titulo = intercambioData.titulo;
            let respuestas = intercambioData.respuestas;
            let foto = req.files['foto'] ? req.files['foto'][0].path : null;

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
            if (puntaje < 1 || puntaje > 5){
                console.error('Invalid puntaje. Must be between 1 and 5.');
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

    app.post('/send-resumen', upload.fields([{ name: 'archivo', maxCount: 1 }]), async (req, res) => {
        try {
            const resumenData = req.body;
            console.log("Receiving resumen data...");

            let descripcion = resumenData.descripcion;
            let contenido = resumenData.contenido;
            let titulo = resumenData.titulo;
            let filtros = resumenData.filtros;
            let archivo = req.files['archivo'] ? req.files['archivo'][0].path : null;

            const filtrosPermitidos = ['fisica', 'matematica', 'edu judia', 'historia', 'tecnologia', 'ingles', 'geografia', 'quimica', 'lengua', 'fuentes', 'biologia', 'etica', 'economia', 'hebreo', 'ciencias sociales', 'ciencias naturales'];
            if(!filtrosPermitidos.includes(filtros.toLowerCase())){
                console.error('Filter must be a validated one');
            }
            
            const resumen = await Resumen.create({ titulo: titulo, descripcion: descripcion, archivo: archivo, contenido: contenido, filtros: filtros });
            res.status(201).json({ message: 'Resumen sent successfully' });
        } catch (error) {
            console.error("Error sending resumen:", error);
            res.status(500).json({ message: 'Error sending resumen', error });
        }
    });

    app.post('/send-objetosPerdidos', upload.fields([{ name: 'foto', maxCount: 1 }]), async (req, res) => {
        try {
            const objetosPerdidosData = req.body;
            console.log("Receiving objetosPerdidos data...");

            let informacion = objetosPerdidosData.informacion;
            let foto = req.files['foto'] ? req.files['foto'][0].path : null;

            const objeto = await objetosPerdidos.create({ informacion: informacion, foto: foto });
            res.status(201).json({ message: 'Objeto perdido registered successfully' });
        } catch (error) {
            console.error("Error registering objeto perdido:", error);
            res.status(500).json({ message: 'Error registering objeto perdido', error });
        }
    });

    app.post('/send-foro', upload.fields([{ name: 'foto', maxCount: 1 }]), async (req, res) => {
        try {
            const foroData = req.body;
            console.log("Receiving foro data...");

            let pregunta = foroData.pregunta;
            let textoExplicativo = foroData.textoExplicativo;
            let comentarios = foroData.comentarios;
            let foto = req.files['foto'] ? req.files['foto'][0].path : null;

            const foro = await Foro.create({ pregunta: pregunta, foto: foto, textoExplicativo: textoExplicativo, comentarios: comentarios });
            res.status(201).json({ message: 'Foro created successfully' });
        } catch (error) {
            console.error("Error creating foro:", error);
            res.status(500).json({ message: 'Error creating foro', error });
        }
    });

    app.get('/download/:model/:id/:fileType', async (req, res) => {
        try {
            const { model, id, fileType } = req.params;
    
            let Model;
            if (model === 'resumen') {
                Model = Resumen;
            } else if (model === 'foro') {
                Model = Foro;
            } else if (model === 'intercambio') {
                Model = Intercambio;
            } else if (model === 'objetosPerdidos') {
                Model = objetosPerdidos;
            } else {
                return res.status(400).json({ message: 'Invalid model type' });
            }
    
            const record = await Model.findByPk(id);
            if (!record || !record[fileType]) {
                return res.status(404).json({ message: `${fileType} not found` });
            }
    
            const fileBuffer = record[fileType];
            let contentType = 'application/octet-stream';
    
            if (fileType === 'foto') {
                contentType = 'image/jpeg';
            } else if (fileType === 'archivo') {
                contentType = 'application/pdf';
            }
    
            res.setHeader('Content-Type', contentType);
            res.setHeader('Content-Disposition', `attachment; filename="${fileType}"`);
            res.end(fileBuffer);
        } catch (error) {
            console.error("Error downloading file:", error);
            res.status(500).json({ message: 'Error downloading file', error });
        }
    });
}

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(redChalk(`Server is running on port ${PORT}`));
});

export { authenticateToken };
