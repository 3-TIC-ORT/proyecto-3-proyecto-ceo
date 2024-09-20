import Sequelize from "sequelize";
import { sequelize } from "../DB/DBcontroller.js";
import chalk from "chalk";


const greenChalk = chalk.greenBright;
const redChalk = chalk.redBright;
const yellowChalk = chalk.yellowBright;
const blueChalk = chalk.cyanBright;

console.log(blueChalk("Definiendo modelo foro..."))
const Foro = sequelize.define('Foros', {
    pregunta: {
        type: Sequelize.STRING,
        allowNull: false
    },
    foto: {
        type: Sequelize.BLOB('medium'),
        allowNull: true
    },
    textoExplicativo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    comentarios: {
        type: Sequelize.STRING,
        allowNull: true
    }
},{
    timestamps: false,
    tableName: 'Foros'
})

export { Foro }
