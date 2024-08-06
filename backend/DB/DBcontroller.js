import chalk from 'chalk';
import Sequelize from 'sequelize'

const sequelize = new Sequelize ('campus_alumnos_db', 'root', 'rootroot',{
    host: "127.0.0.1",
    dialect: "mysql",
    port: 3306
})

sequilize.authenticate()
    .then(()=> {
        console.log("BLABALA");

    }).catch(err => {
        console.error(err);
    })

export { sequelize }