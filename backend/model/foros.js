import Sequelize from "sequelize";
import { sequelize } from "../DB/DBcontroller.js";
import chalk from "chalk";
import { type } from "os";

const greenChalk = chalk.greenBright;
const redChalk = chalk.redBright;
const yellowChalk = chalk.yellowBright;
const blueChalk = chalk.cyanBright;

console.log(blueChalk("Definiendo Foros..."))
const Foro = sequelize.define('Foros', {
    pregunta: {
        type: Sequelize.STRING,
        allowNull: false
    },
    foto: {
        type: Sequelize.BLOB,
        allowNull: false
    },
    textoExplicativo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    comentarios: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

export { Foro }
