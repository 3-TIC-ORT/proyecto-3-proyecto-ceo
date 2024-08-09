import Sequelize from "sequelize";
import { sequelize } from "../DB/DBcontroller";
import chalk from "chalk";
import { type } from "os";

const greenChalk = chalk.greenBright;
const redChalk = chalk.redBright;
const yellowChalk = chalk.yellowBright;
const blueChalk = chalk.cyanBright;

const objetosPerdidos = sequelize.define('objetosPerdidos', {
    Foto: {
        type: Sequelize.BLOB,
        allowNull: false
    },
    Informacion: {
        type: Sequelize.STRING,
        allowNull: false
    }
})