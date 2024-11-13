import { json, where, Op} from 'sequelize';
import { Resumen } from "../model/resumenes.js"
import chalk from "chalk";

const yellowChalk = chalk.yellowBright;

async function getResumenes() {
    console.log(yellowChalk('[controller] Fetching all resumenes..'))
    
    const resumenes = await Resumen.findAll()
    return resumenes;
}

async function getResumenByiD(id) {
    console.log(yellowChalk('[controller] Fetching resumen..'))
    const resumen = await Resumen.findOne({ 
        where: {
            id
        }
    })
    if (!resumen) {
        console.log('[controller] ERROR, Resumen no existe')
    }
    return resumen;
}

async function searchResumenes(query, filtro) {
    console.log(yellowChalk('[controller] Searching all resumenes..'))
    try {
        const resultados = await Resumen.findAll({
            where: {
                titulo: {
                    [Op.like]: `%${query}%`,
                },
                filtros: {
                    [Op.like]: `%${filtro}%` 
                }
            }
        })
        return resultados;
    } catch (error) {
        console.log(`[controller] Failed to search resumen with ${query}, ERROR:`, error)
    }
}

export { getResumenes }
export { searchResumenes }
export { getResumenByiD }