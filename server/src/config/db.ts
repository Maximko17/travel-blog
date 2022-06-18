import { Sequelize } from "sequelize";
const { DB_USER, DB_PASSWORD, DB_PORT, DB_NAME } = process.env;

if (!DB_NAME) {
   throw new Error("Env. variable 'DB_NAME' not found");
}
if (!DB_USER) {
   throw new Error("Env. variable 'DB_USER' not found");
}
if (!DB_PASSWORD) {
   throw new Error("Env. variable 'DB_PASSWORD' not found");
}
if (!DB_PORT) {
   throw new Error("Env. variable 'DB_PORT' not found");
}

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
   port: +DB_PORT,
   host: "db",
   dialect: "postgres",
   logging: console.log,
   timezone: "+00:00",
   define: {
      timestamps: false,
   },
});

export default sequelize;

export const openDBConnection = async () => {
   await sequelize.authenticate();
};

export const closeDBConnection = async () => {
   await sequelize.close();
};
