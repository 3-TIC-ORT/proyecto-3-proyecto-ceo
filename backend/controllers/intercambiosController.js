import { Intercambio } from "../model/intercambio.js";
import chalk from "chalk";

const yellowChalk = chalk.yellowBright;

async function getIntercambios() {
    console.log(yellowChalk('Fetching all intercambios..'))
    
    const intercambios = await Intercambio.findAll()
    return intercambios;
}

export { getIntercambios }