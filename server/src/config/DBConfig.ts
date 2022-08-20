import path from "path";
import { Sequelize } from "sequelize-typescript";
import { createNamespace } from "cls-hooked";
import logger from "../logger";

const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_PORT, POSTGRES_DB } =
   process.env;

if (!POSTGRES_DB) {
   throw new Error("Env. variable 'POSTGRES_DB' not found");
}
if (!POSTGRES_USER) {
   throw new Error("Env. variable 'POSTGRES_USER' not found");
}
if (!POSTGRES_PASSWORD) {
   throw new Error("Env. variable 'POSTGRES_PASSWORD' not found");
}
if (!POSTGRES_PORT) {
   throw new Error("Env. variable 'POSTGRES_PORT' not found");
}

// Необходимо для упрощения работы с транзакциями, а именно, чтобы не передавать вручную значение транзакции в каждый запрос к бд
const namespace = createNamespace("ns");
Sequelize.useCLS(namespace);

const sequelize = new Sequelize(POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD, {
   port: +POSTGRES_PORT,
   host: "db",
   dialect: "postgres",
   timezone: "+00:00",
   define: {
      timestamps: false,
      underscored: true,
   },
   models: [path.resolve(__dirname, "../models")],
   logging: (msg) => logger.info(msg),
});

export default sequelize;

export const openDBConnection = async () => {
   await sequelize.authenticate();
};

export const closeDBConnection = async () => {
   await sequelize.close();
};
