import configs from "@lib/config/default.config";
import {Sequelize} from "sequelize";

const sequelize: Sequelize = new Sequelize(configs.DB_URI, {
    logging: false,
    timezone: '+00:00',
    pool: {
      max: 20,
      min: 0,
      acquire: 60000,
      idle: 10000
    }
});


const connectToDatabase = async()=>{
    try{
        await sequelize.authenticate();
        console.log("Connected to database");
    } catch (err: any) {
        console.log(err.message);
        setTimeout(connectToDatabase, 5000);
    }
};

export {connectToDatabase};

export default sequelize;