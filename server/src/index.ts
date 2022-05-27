import "dotenv/config";
import express from "express";
import { dbClient } from "./db";
const { NODE_PORT } = process.env;

const app = express();

app.get("/home", (req, res) => {
   res.send("MY CODE!!");
});

(async () => {
   if (!NODE_PORT) {
      throw new Error("Env. variable 'NODE_PORT' not found");
   }

   try {
      await dbClient.connect();

      app.listen(NODE_PORT, () => {
         console.log("Listening on port", NODE_PORT);
      });
   } catch (error) {
      console.log(error);
   }
})();
