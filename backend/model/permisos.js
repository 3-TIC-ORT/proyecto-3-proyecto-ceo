import Sequelize from "sequelize";
import { sequelize } from "../DB/DBcontroller.js";
import chalk from "chalk";
import { type } from "os";


const greenChalk = chalk.greenBright;
const redChalk = chalk.redBright;
const yellowChalk = chalk.yellowBright;
const blueChalk = chalk.cyanBright;

console.log(blueChalk("Definiendo modelo de permisos..."))
const Permisos  = sequelize.define('Permisos', {
    permiso:{
        type: Sequelize.STRING,
        allowNull: false
    },
    userId:{
        type: Sequelize.INTEGER,
        allownull: false,
    },
})

export { Permisos }



