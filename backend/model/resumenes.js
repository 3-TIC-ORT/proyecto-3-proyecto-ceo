import Sequelize from "sequelize";
import { sequelize } from "../DB/DBcontroller.js";
import chalk from "chalk";
import { type } from "os";

const greenChalk = chalk.greenBright;
const redChalk = chalk.redBright;
const yellowChalk = chalk.yellowBright;
const blueChalk = chalk.cyanBright;

console.log(blueChalk("Definiendo modelo resumen..."));
const Resumen = sequelize.define('Resumen', {
    archivo: {
        type: Sequelize.BLOB('long'),
        allowNull: true,
    },
    contenido: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    titulo: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    descripcion: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    filtros: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    like: {
        type: Sequelize.NUMBER,
        allowNull: true,
    },
    dislike:{
        type: Sequelize.NUMBER,
        allowNull: true,
    }
}, {
    timestamps: false,
    tableName: 'Resumen'
})

export { Resumen }