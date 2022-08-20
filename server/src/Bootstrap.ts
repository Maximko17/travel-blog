import "reflect-metadata";
import path from "path";
import dotenv from "dotenv";
dotenv.config({ path: path.resolve(__dirname, "../.env.development") });
import { AppBootstrap } from "./AppBootstrap";
import db, { openDBConnection } from "./config/DBConfig";
import logger from "./logger";

const {
   NODE_PORT,
   NODE_ENV,
   JWT_ACCESS_SECRET,
   JWT_REFRESH_SECRET,
   ENCRYPT_SECRET_KEY,
} = process.env;

(async () => {
   if (!NODE_ENV) {
      throw new Error("Env. variable 'NODE_ENV' not found");
   }
   if (!NODE_PORT) {
      throw new Error("Env. variable 'NODE_PORT' not found");
   }
   if (!JWT_ACCESS_SECRET) {
      throw new Error("Env. variable 'JWT_ACCESS_SECRET' not found");
   }
   if (!JWT_REFRESH_SECRET) {
      throw new Error("Env. variable 'JWT_REFRESH_SECRET' not found");
   }
   if (!ENCRYPT_SECRET_KEY) {
      throw new Error("Env. variable 'ENCRYPT_SECRET_KEY' not found");
   }

   try {
      await openDBConnection();
      // NODE_ENV === "development" && (await db.sync({ force: true }));

      logger.info("db.models %s", Object.values(db.models));
   } catch (error) {
      logger.error(error);
   }

   const app = new AppBootstrap().getApp();

   app.listen(NODE_PORT, () => {
      logger.info("Listening on port %s", NODE_PORT);
   });
})();
