import Sequelize from "sequelize";
import { sequelize } from "../DB/DBcontroller.js";
import chalk from "chalk";

const blueChalk = chalk.cyanBright;

console.log(blueChalk("Definiendo modelo comentario..."));
const Comentario = sequelize.define('Comentarios', {
    idPost: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    idCreator: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    contenido: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    seccion: {
        type: Sequelize.STRING,
        allowNull: false,
    }
},{
    timestamps: false,
    tableName: 'Comentarios',
})

export { Comentario }