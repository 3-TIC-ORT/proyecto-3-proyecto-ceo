import Sequelize from "sequelize";
import { sequelize } from "../DB/DBcontroller.js";
import chalk from "chalk";
import { type } from "os";


const greenChalk = chalk.greenBright;
const redChalk = chalk.redBright;
const yellowChalk = chalk.yellowBright;
const blueChalk = chalk.cyanBright;

console.log(blueChalk("Definiendo modelo de objetosPerdidos..."))
const objetoPerdido = sequelize.define('objetosPerdidos', {
    foto: {
        type: Sequelize.BLOB('medium'),
        allowNull: true
    },
    informacion: {
        type: Sequelize.STRING,
        allowNull: false
    },
    titulo: {
        type: Sequelize.STRING,
        allowNull: false       
    },
    userId: {
        type: Sequelize.NUMBER,
        allowNull: false
    },
    foto_format: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    timestamps: false,
    tableName: 'Objetosperdidos'
})

export { objetoPerdido }  