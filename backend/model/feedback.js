import Sequelize from "sequelize";
import { sequelize } from "../DB/DBcontroller.js";
import chalk from "chalk";
import { type } from "os";

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
        allowNull: false,
    },
    opinion: {
        type: Sequelize.STRING,
        allowNull: false,
    },

})

export { FeedbackModel }