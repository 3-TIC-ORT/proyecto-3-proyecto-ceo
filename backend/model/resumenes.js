import Sequelize from "sequelize";
import { sequelize } from "../DB/DBcontroller.js";
import chalk from "chalk";
import { type } from "os";

const greenChalk = chalk.greenBright;
const redChalk = chalk.redBright;
const yellowChalk = chalk.yellowBright;
const blueChalk = chalk.cyanBright;

console.log(blueChalk("Definiendo modelo resumen..."));
const Resumen = sequelize.define('Resumenes', {
    archivo: {
        type: Sequelize.BLOB('long'),
        allowNull: true,
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
        defaultValue: 0,
        allowNull: true,
    },
    dislike: {
        type: Sequelize.NUMBER,
        defaultValue: 0,
        allowNull: true,
    },
    userId:{
        type: Sequelize.NUMBER,
        allowNull: true,
    }, 
    format: {
        type: Sequelize.STRING,
        allowNull: true,
    },
}, {
    timestamps: false,
    tableName: 'Resumenes'
})

export { Resumen }