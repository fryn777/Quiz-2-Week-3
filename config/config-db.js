import sequelize from "sequelize";
import config from './config';

const sequelize = new Sequelize(
    config.db_name,
    config.db_username,
    config.db_password,
    {
        diaclet : 'postgres'
    }
) 

sequelize
.authenticate()
.then(()=>console.log('Connection has been estabilished succesfully'))
.catch(err => console.log(err))

export {sequelize}