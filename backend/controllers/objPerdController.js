import { objetoPerdido } from "../model/objetosPerdidos.js";
import chalk from "chalk";
import fs from 'fs'

const yellowChalk = chalk.yellowBright;

async function getObjetosPerdidos() {
    console.log(yellowChalk('Fetching all objetos perdidos..'))
    
    const objetosPerdidos = await objetoPerdido.findAll()
    return objetosPerdidos;
}

async function getObjeto(id) {
    console.log(yellowChalk('[controller] Fetching objeto image..'))
    const objeto = await objetoPerdido.findOne({ 
        where: {
            id
        }
    })
    if (!objeto) {
        console.log('[controller] ERROR, Objeto no existe')
    }
    return objeto;
}
export { getObjetosPerdidos }

export { getObjeto }