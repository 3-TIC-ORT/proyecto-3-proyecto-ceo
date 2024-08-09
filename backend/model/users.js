import { timeStamp } from "console";
import Sequelize from "sequelize";
import { sequelize } from "../DB/DBcontroller.js";

console.log("Definiendo modelo usuario...")
const User = sequelize.define('Users', {
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    firstName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    gmail:{
        type: Sequelize.STRING,
        allowNull: false
    },
}, {
    timestamps: false
})

export { User }
