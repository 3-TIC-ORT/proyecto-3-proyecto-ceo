import Sequelize  from "sequelize";
import { sequelize } from "../DB/DBcontroller.js";
import chalk from "chalk";
import { type } from "os";
import { create } from "domain";
import { uptime } from "process";
import { timeStamp } from "console";

const greenChalk = chalk.greenBright;
const redChalk = chalk.redBright;
const yellowChalk = chalk.yellowBright;
const blueChalk = chalk.cyanBright;

console.log(blueChalk("Definiendo modelo deintercambio"))
const Intercambio = sequelize.define('Intercambio',{
    informacion:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    titulo:{
        type: Sequelize.STRING,
        allowNull: false
    },
    respuestas:{
        type: Sequelize.STRING,
        allowNull: true,
    },
    foto:{
        type: Sequelize.STRING,
        allowNull: true,
    }
},{
    timestamp: false,
    tableName: 'Intercambio'
})

export { Intercambio }
