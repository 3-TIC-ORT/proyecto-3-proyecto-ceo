import chalk from 'chalk';
import Sequelize from 'sequelize'

console.log("Declarando DB")

const sequelize = new Sequelize ('campus_alumnos_db', 'root', 'root',{
    host: "127.0.0.1",
    dialect: "mysql",
    port: 3306
})

sequelize.authenticate()
    .then(()=> {
        console.log("Conexion exitosa!");

    }).catch(err => {
        console.error(err, "Conexion fallida");
    })

export { sequelize }
