import { objetoPerdido } from "../model/objetosPerdidos.js";
import chalk from "chalk";

const yellowChalk = chalk.yellowBright;

async function getObjetosPerdidos() {
    console.log(yellowChalk('Fetching all objetos perdidos..'))
    
    const objetosPerdidos = await objetoPerdido.findAll()
    return objetosPerdidos;
}

export { getObjetosPerdidos }