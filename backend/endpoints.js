import argon2 from 'argon2';
import jsonwebtoken from 'jsonwebtoken';
import multer from 'multer';
import path, { dirname } from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { User } from './model/users.js';
import { Foro } from './model/foros.js';
import { objetoPerdido } from './model/objetosPerdidos.js';
import { Feedback } from './model/feedback.js';
import { Intercambio } from './model/intercambio.js';
import { Resumen } from './model/resumenes.js';

import express from 'express';
import bodyParser from 'body-parser';
import chalk from 'chalk';
import { config } from 'dotenv';

config();

const SECRET_KEY = process.env.SECRET_KEY;
import { json, where } from 'sequelize';

const blueChalk = chalk.blue
const greenChalk = chalk.greenBright;
const redChalk = chalk.redBright;
const yellowChalk = chalk.yellowBright;


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


async function encryptPassword(password) {
    try {
        let hash = await argon2.hash(password, { type: argon2.argon2id, saltLength: 16 });
        console.log(greenChalk('Password encrypted successfully'));
        return hash;
    } catch (error) {
        console.error(redChalk("Error encrypting password:"), error);
        throw error;
    }
}

async function createToken(user) {
    try {
        let payload = {
            id: user.id,
            firstName: user.firstName
        };

        const token = jsonwebtoken.sign(payload, SECRET_KEY, { expiresIn: '1m' });
        console.log(`[token] TOKEN ID IS: '${user.id}' AND NAME: ${user.firstName}`);
        
        return token;
    } catch (error) {
        console.log(redChalk('[server] COULD NOT CREATE TOKEN:'), error);
        throw error;
    }
}

async function verifyPassword(hash, password) {
    try {
        return await argon2.verify(hash, password);
    } catch (error) {
        console.log(redChalk("[password] ERROR, verification failed"), error);
        throw error;
    }
}

async function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    console.log(blueChalk('Checking token...'));
    console.log('[server] TOKEN IS:', token);

    if (!token) {
        console.log('No token!');
        return res.sendStatus(401);
    }
    
    jsonwebtoken.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            console.log('Invalid token!');
            return res.sendStatus(403);
        }
        console.log(greenChalk('Authentication successful!'));
        req.user = user;
        next();
    });
}

export async function endpoints(app) {

    app.post('/login', async (req, res) => {
        const { password, firstName, gmail } = req.body;
        console.log(blueChalk(`Searching for '${greenChalk(firstName)}' with gmail: ${greenChalk(gmail)}`));
    
        try {
            const user = await User.findOne({
                where: { firstName, gmail }
            });    
    
            if (!user) {
                console.log(redChalk('[login] User not found :('));
                return res.status(404).json({ message: 'User not found' });
            }
    
            const passwordMatch = await verifyPassword(user.password, password);
            if (!passwordMatch) {
                console.log(redChalk('Incorrect password'));
                return res.status(403).send('Incorrect password');
            }
    
            const token = await createToken(user);
            console.log(greenChalk('User logged in successfully!'));
            res.status(200).send({ token });
        } catch (error) {
            console.log('[login] ERROR, Failed to create a token:', error)
            res.status(500).send('Failed to login')
            throw error
        }
    });
    
    app.post('/registers', async (req, res) => {
        try {
            const { firstName, password, lastName, gmail } = req.body;
            console.log("Receiving user data...");
    
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(gmail)) {
                console.error('Invalid email format');
                return res.status(400).json({ message: 'Invalid email format' });
            }
    
            const encryptedPassword = await encryptPassword(password);
            const user = await User.create({ firstName, lastName, password: encryptedPassword, gmail });
    
            const token = await createToken(user);
            res.status(200).send({ token });
        } catch (error) {
            console.error(redChalk("Error creating user:"), error);
            res.status(500).json({ message: 'Error creating user', error });
        }
    });
    
    app.post('/send-intercambio', upload.fields([{ name: 'foto', maxCount: 1 }]), async (req, res) => {
        try {
            const { informacion, titulo, respuestas } = req.body;
            console.log("Receiving intercambio data...");
    
            const foto = req.files['foto'] ? req.files['foto'][0].path : null;
    
            const intercambio = await Intercambio.create({ informacion, titulo, respuestas, foto });
            res.status(200).json({ message: 'Intercambio created successfully' });
        } catch (error) {
            console.error(redChalk("Error creating intercambio:"), error);
            res.status(500).json({ message: 'Error creating intercambio', error });
        }
    });
    
    app.post('/feedbacks', async (req, res) => {
        try {
            const { puntaje, sugerencia, opinion } = req.body;
            console.log("Receiving feedback data...");
    
            if (puntaje < 1 || puntaje > 5) {
                console.error('Invalid puntaje. Must be between 1 and 5.');
                return res.status(400).json({ message: 'Invalid puntaje' });
            }
    
            const feedback = await Feedback.create({ puntaje, sugerencia, opinion });
            res.status(201).json({ message: 'Feedback sent successfully' });
        } catch (error) {
            console.error(redChalk("Error sending feedback:"), error);
            res.status(500).json({ message: 'Error sending feedback', error });
        }
    });
    
    app.post('/send-resumen', upload.fields([{ name: 'archivo', maxCount: 1 }]), async (req, res) => {
        try {
            const { descripcion, titulo, filtros, like, dislike } = req.body;
            console.log("Receiving resumen data...");

            const archivo = req.files['archivo'] ? req.files['archivo'][0].path : null;

            const resumen = await Resumen.create({ titulo, descripcion, archivo, filtros, like, dislike });
            res.status(201).json({ message: 'Resumen sent successfully' });
        } catch (error) {
            console.error(redChalk("Error sending resumen:"), error);
            res.status(500).json({ message: 'Error sending resumen', error });
        }
    });

    app.post('/send-objetosPerdidos', upload.fields([{ name: 'foto', maxCount: 1 }]), async (req, res) => {
        try {
            const { informacion } = req.body;
            console.log("Receiving objetosPerdidos data...");
    
            const foto = req.files['foto'] ? req.files['foto'][0].path : null;
    
            const objetoPerdido = await objetoPerdido.create({ informacion, foto });
            res.status(201).json({ message: 'Objeto perdido registered successfully' });
        } catch (error) {
            console.error(redChalk("Error registering objeto perdido:"), error);
            res.status(500).json({ message: 'Error registering objeto perdido', error });
        }
    });
    
    app.post('/send-foro', upload.fields([{ name: 'foto', maxCount: 1 }]), async (req, res) => {
        try {
            const { pregunta, textoExplicativo, comentarios } = req.body;
            console.log("Receiving foro data...");
    
            const foto = req.files['foto'] ? req.files['foto'][0].path : null;
    
            const foro = await Foro.create({ pregunta, textoExplicativo, comentarios, foto });
            res.status(201).json({ message: 'Foro created successfully' });
        } catch (error) {
            console.error(redChalk("Error creating foro:"), error);
            res.status(500).json({ message: 'Error creating foro', error });
        }
    });

    app.put('/objetosPerdidos/:id', authenticateToken, upload.single('foto'), async (req, res)=>{
        const {id} = req.params;
        const { informacion } =  req.body;
        const foto = req.file ? req.file.buffer : undefined;

        try {
            const objetoPerdido = objetoPerdido.findByPk(id);

            if(!objetoPerdido){
                res.status(404).json({message: 'Objeto perdido not found'});
            }

            if (foto !== undefined) objetoPerdido.foto = foto;
            if (informacion !== undefined) objetoPerdido.informacion = informacion;

            await objetoPerdido.save();
            res.status(200).json({message: 'Objeto perdido upload  succesfully'});
        } catch (error) {
            console.error('Upload failed');
            res.status(500).json({message: 'Error updating objetos perdidos'});
        }
    });

    app.put('/intercambio/:id', authenticateToken, upload.single('archivo'), async (req, res) => {
        const { id } = req.params;
        const { informacion, titulo, respuestas } = req.body;
        const archivo = req.file ? req.file.buffer : undefined;
    
        try {
            const intercambio = await Intercambio.findByPk(id);
    
            if (!intercambio) {
                return res.status(404).json({ message: 'Intercambio does not exist' });
            }

            if (titulo !== undefined) intercambio.titulo = titulo;
            if (respuestas !== undefined) intercambio.respuestas = respuestas;
            if (informacion !== undefined) intercambio.informacion = informacion;
            if (archivo !== undefined) intercambio.archivo = archivo;
    
            await intercambio.save();
            res.status(200).json({ message: 'Intercambio updated successfully' });
        } catch (error) {
            console.error('Upload failed:', error);
            res.status(500).json({ message: 'Error updating intercambio' });
        }
    });

    app.put('/foros/:id', authenticateToken, upload.single('foto'), async (req, res) => {
        const { id } = req.params;
        const { pregunta, textoExplicativo, comentarios } = req.body;
        const foto = req.file ? req.file.buffer : undefined;

        try {
            const foro = await Foro.findByPk(id);

            if (!foro) {
                return res.status(404).json({ message: 'Foro not found' });
            }

            if (pregunta !== undefined) foro.pregunta = pregunta;
            if (textoExplicativo !== undefined) foro.textoExplicativo = textoExplicativo;
            if (comentarios !== undefined) foro.comentarios = comentarios;
            if (foto !== undefined) foro.foto = foto;

            await foro.save();
            res.status(200).json({ message: 'Foro updated successfully' });
        } catch (error) {
            console.error("Error updating foro:", error);
            res.status(500).json({ message: 'Error updating foro' });
        }
    });

    app.put('/resumen/:id', authenticateToken, upload.single('archivo'), async (req, res) => {
        const { id } = req.params;
        const { action, descripcion, titulo, filtros } = req.body;
        const archivo = req.file ? req.file.buffer : undefined;
        const userId = req.user.id;
    
        try {
            const resumen = await Resumen.findByPk(id);
    
            if (!resumen) {
                return res.status(404).json({ message: 'Resumen not found' });
            }

            if (action === 'like') {
                if (resumen.dislike > 0) {
                    resumen.dislike -= 1;
                }
                resumen.like += 1;
    
                await Interaccion.upsert({
                    userId,
                    resumenId: id,
                    action: 'like'
                });
            } else if (action === 'dislike') {
                if (resumen.like > 0) {
                    resumen.like -= 1;
                }
                resumen.dislike += 1;
    
                await Interaccion.upsert({
                    userId,
                    resumenId: id,
                    action: 'dislike'
                });
            } else {
                return res.status(400).json({ message: 'Invalid action' });
            }

            if (titulo !== undefined) resumen.titulo = titulo;
            if (filtros !== undefined) resumen.filtros = filtros;
            if (descripcion !== undefined) resumen.descripcion = descripcion;
            if (archivo !== undefined) resumen.archivo = archivo;
    
            await resumen.save();
    
            res.status(200).json({ message: 'Resumen updated successfully' });
        } catch (error) {
            console.error('Update failed:', error);
            res.status(500).json({ message: 'Error updating resumen' });
        }
    });
    
    app.get('/download/:model/:id/:fileType', authenticateToken, async (req, res) => {
        const { model, id, fileType } = req.params;
    
        const models = {
            resumen: Resumen,
            foro: Foro,
            intercambio: Intercambio,
            objetosPerdidos: objetoPerdido
        };
    
        if (!models[model]) {
            return res.status(400).json({ message: 'Invalid model' });
        }
    
        try {

            const modelInstance = await models[model].findOne({ where: { id } });
            if (!modelInstance || !modelInstance[fileType]) {
                return res.status(404).json({ message: 'File not found' });
            }
    
            const filePath = modelInstance[fileType];
            res.setHeader('Content-Type', 'application/octet-stream');
            res.setHeader('Content-Disposition', `attachment; filename=${path.basename(filePath)}`);
            res.download(filePath);
        } catch (error) {
            console.error(redChalk("Error downloading file:"), error);
            res.status(500).json({ message: 'Error downloading file', error });
        }
    });
}

app.get('/users', authenticateToken, async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        console.error(redChalk("Error fetching users:"), error);
        res.status(500).json({ message: 'Error fetching users', error });
    }
});

app.get('/intercambios', authenticateToken, async (req, res) => {
    try {
        const intercambios = await Intercambio.findAll();
        res.status(200).json(intercambios);
    } catch (error) {
        console.error(redChalk("Error fetching intercambios:"), error);
        res.status(500).json({ message: 'Error fetching intercambios', error });
    }
});

app.get('/feedbacks', authenticateToken, async (req, res) => {
    try {
        const feedbacks = await FeedbackModel.findAll();
        res.status(200).json(feedbacks);
    } catch (error) {
        console.error(redChalk("Error fetching feedbacks:"), error);
        res.status(500).json({ message: 'Error fetching feedbacks', error });
    }
});

app.get('/resumenes', authenticateToken, async (req, res) => {
    try {
        const resumenes = await Resumen.findAll();
        res.status(200).json(resumenes);
    } catch (error) {
        console.error(redChalk("Error fetching resumenes:"), error);
        res.status(500).json({ message: 'Error fetching resumenes', error });
    }
});

app.get('/objetos-perdidos', authenticateToken, async (req, res) => {
    try {
        const objetos = await objetoPerdido.findAll();
        res.status(200).json(objetos);
    } catch (error) {
        console.error(redChalk("Error fetching objetos perdidos:"), error);
        res.status(500).json({ message: 'Error fetching objetos perdidos', error });
    }
});

app.get('/foros', authenticateToken, async (req, res) => {
    try {
        const foros = await Foro.findAll();
        res.status(200).json(foros);
    } catch (error) {
        console.error(redChalk("Error fetching foros:"), error);
        res.status(500).json({ message: 'Error fetching foros', error });
    }
});

export { authenticateToken }
