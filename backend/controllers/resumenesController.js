import { Resumen } from "../model/resumenes.js"
import chalk from "chalk";

const yellowChalk = chalk.yellowBright;

async function getResumenes() {
    console.log(yellowChalk('Fetching all resumenes..'))
    
    const resumenes = await Resumen.findAll()
    return resumenes;
}

export { getResumenes }