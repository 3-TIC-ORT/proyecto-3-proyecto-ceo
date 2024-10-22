import Sequelize  from "sequelize";
import { sequelize } from "../DB/DBcontroller.js";
import chalk from "chalk";
import { type } from "os";

const greenChalk = chalk.greenBright;
const redChalk = chalk.redBright;
const yellowChalk = chalk.yellowBright;
const blueChalk = chalk.cyanBright;

console.log(blueChalk("Definiendo modelo de intercambio..."))
const Intercambio = sequelize.define('Intercambio',{
    informacion:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    titulo:{
        type: Sequelize.STRING,
        allowNull: false
    },
    foto: {
        type: Sequelize.BLOB('medium'),
        allowNull: true,
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    foto_format: {
        type: Sequelize.STRING,
        allowNull: true,
    }
},{
    timestamps: true,
    tableName: 'Intercambio'
})

export { Intercambio }
