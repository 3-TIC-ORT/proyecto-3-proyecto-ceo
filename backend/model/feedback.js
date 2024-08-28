import Sequelize from "sequelize";
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

console.log(blueChalk("Definiendo modelo feedback..."));
const FeedbackModel = sequelize.define('Feedback', {
    puntaje: {
        type: Sequelize.NUMBER,
        allowNull: false,
    },
    sugerencia: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    opinion: {
        type: Sequelize.STRING,
        allowNull: false,
    },
},{
    timestamp: false,
    tableName: 'Feedback',
})

export { FeedbackModel }