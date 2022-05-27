import { Sequelize, Dialect } from "sequelize";

class DbClient {
   private _connection?: Sequelize;
   private _host = "db";
   private _dialect: Dialect = "postgres";

   get connection(): Sequelize {
      if (!this._connection) {
         throw new Error("Can not access DB client before connection");
      }
      return this._connection;
   }

   connect = async () => {
      if (!process.env.POSTGRES_DB) {
         throw new Error("Env. variable 'POSTGRES_DB' not found");
      }
      if (!process.env.POSTGRES_USER) {
         throw new Error("Env. variable 'POSTGRES_USER' not found");
      }
      if (!process.env.POSTGRES_PASSWORD) {
         throw new Error("Env. variable 'POSTGRES_PASSWORD' not found");
      }

      this._connection = new Sequelize(
         process.env.POSTGRES_DB,
         process.env.POSTGRES_USER,
         process.env.POSTGRES_PASSWORD,
         {
            host: this._host,
            dialect: this._dialect,
            logging: console.log,
         }
      );

      try {
         await this._connection.authenticate();
         console.log("Connected to db");
      } catch (error) {
         throw new Error("Can not connect to database " + error);
      }
   };
}

export const dbClient = new DbClient();
