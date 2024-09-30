import { Foro } from "../model/foros.js"
import chalk from "chalk";

const yellowChalk = chalk.yellowBright;

async function getForos() {
    console.log(yellowChalk('Fetching all foros..'))
    
    const foros = await Foro.findAll()
    return foros;
}

export { getForos }