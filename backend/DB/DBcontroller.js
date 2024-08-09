import chalk from 'chalk';
import Sequelize from 'sequelize'

const greenChalk = chalk.greenBright;
const redChalk = chalk.redBright;
const yellowChalk = chalk.yellowBright;
const blueChalk = chalk.cyanBright;

console.log(blueChalk("Corriendo DB"));

const sequelize = new Sequelize ('campus_alumnos_db', 'root', 'rootroot',{
    host: "127.0.0.1",
    dialect: "mysql",
    port: 3306
})

sequelize.authenticate()
    .then(()=> {
        console.log(greenChalk("Conexion exitosa!"));

    }).catch(err => {
        console.error(err, "Conexion fallida");
    })

export { sequelize }
