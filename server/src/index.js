import "dotenv/config";
import express from "express";
import { Sequelize } from "sequelize";
const { NODE_PORT, POSTGRES_PASSWORD, POSTGRES_USER, POSTGRES_DB } =
   process.env;

const app = express();

app.get("/home", (req, res) => {
   res.send("MY CODE!!!");
});

(async () => {
   const sequelize = new Sequelize(
      POSTGRES_DB,
      POSTGRES_USER,
      POSTGRES_PASSWORD,
      {
         host: "db",
         port: 5432,
         dialect: "postgres",
         logging: console.log,
      }
   );

   try {
      await sequelize.authenticate();
      console.log("Connection has been established successfully.");
   } catch (error) {
      console.error("Unable to connect to the database:", error);
   }

   app.listen(NODE_PORT, () => {
      console.log("Listening on port", NODE_PORT);
   });
})();
