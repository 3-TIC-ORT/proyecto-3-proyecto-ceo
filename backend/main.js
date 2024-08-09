import  Express  from "express";
import  express  from "express";
import { User } from "./model/users.js";
import argon2 from 'argon2'
import jsonwebtoken from 'jsonwebtoken'
import dotenv from 'dotenv'

//colores
import chalk from "chalk";
import exp from "constants";

const greenChalk = chalk.greenBright;
const redChalk = chalk.redBright;
const yellowChalk = chalk.yellowBright;
const blueChalk = chalk.cyanBright;

console.log("0-----------------------S-T-A-R-T-I-N-G-----------------------0")
const app = Express()
const PORT = 3000

app.post('/send_data', async (req, res) => {

    const userData = req.body;

    console.log(yellowChalk("Recibiendo data..."));

    let firstName = userData.firstName;
    let password = await encriptPassword(userData.password)
    let lastName = userData.lastName;
    let gmail = userData.gmail;

    const user = await User.create({firstName: firstName, lastName: lastName, password: password, gmail: gmail})
    
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


export { greenChalk };
export { yellowChalk };