import { app } from "./app";
import db, { openDBConnection } from "./config/db";
const { NODE_PORT, NODE_ENV } = process.env;

(async () => {
   if (!NODE_ENV) {
      throw new Error("Env. variable 'NODE_ENV' not found");
   }
   if (!NODE_PORT) {
      throw new Error("Env. variable 'NODE_PORT' not found");
   }

   try {
      await openDBConnection();
      // NODE_ENV === "development" && (await db.sync({ force: true }));
      console.log(db.models);
   } catch (error) {
      console.log(error);
   }

   app.listen(NODE_PORT, () => {
      console.log("Listening on port", NODE_PORT);
   });
})();
