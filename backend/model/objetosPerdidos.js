import Sequelize from "sequelize";
import { sequelize } from "../DB/DBcontroller.js";
import chalk from "chalk";


const greenChalk = chalk.greenBright;
const redChalk = chalk.redBright;
const yellowChalk = chalk.yellowBright;
const blueChalk = chalk.cyanBright;

const objetoPerdido = sequelize.define('objetosPerdidos', {
    foto: {
        type: Sequelize.BLOB('medium'),
        allowNull: true
    },
    informacion: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    timestamps: false,
    tableName: 'Objetosperdidos'
})

export { objetoPerdido } 