import Sequelize from "sequelize";
import { sequelize } from "../DB/DBcontroller.js";
import chalk from "chalk";

const blueChalk = chalk.cyanBright;

console.log(blueChalk("Definiendo modelo feedback..."));
const Feedback = sequelize.define('feedback', {
    puntaje: {
        type: Sequelize.INTEGER,
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
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
    }
},{
    timestamps: false,
    tableName: 'feedback',
});

export { Feedback }