import Sequelize from "sequelize";
import { sequelize } from "../DB/DBcontroller";

const user = sequelize.define('users', {
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    firstName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lastName: {
        type: sequelize.STRING,
        allowNull: false
    },
    gmail:{
        type: sequelize.STRING,
        allowNull: false
    }
})
