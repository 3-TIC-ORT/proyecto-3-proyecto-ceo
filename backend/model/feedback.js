import Sequelize from "sequelize";
import { sequelize } from "../DB/DBcontroller.js";
import chalk from "chalk";

const blueChalk = chalk.cyanBright;

console.log(blueChalk("Definiendo modelo feedback..."));
const Feedback = sequelize.define('Feedback', {
    puntaje: {
        type: Sequelize.NUMBER,
        allowNull: false,
        validate:{
            min:1,
            max:5
        }
    },
    sugerencia: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    opinion: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    userId:{
        type: Sequelize.INTEGER,
        allownull: false,
    },
},{
    timestamps: false,
    tableName: 'Feedback',
})

export { Feedback }