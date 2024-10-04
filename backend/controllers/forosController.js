import { Foro } from "../model/foros.js"
import chalk from "chalk";
import { Op, where, json } from 'sequelize'

const yellowChalk = chalk.yellowBright;

async function getForos() {
    console.log(yellowChalk('Fetching all foros..'))
    
    const foros = await Foro.findAll()
    return foros;
}

async function searchPregunta(query, filtro) {
    console.log(yellowChalk('[controller] Searching all preguntas..'))
    try {
        const resultados = await Foro.findAll({
            where: {
                pregunta: {
                    [Op.like]: `%${query}%`,
                },
            }
        })
        return resultados;
    } catch (error) {
        console.log(`[controller] Failed to search in foros with ${query}, ERROR:`, error)
    }
}

export { searchPregunta }
export { getForos }