import DevLogger from "./DevLogger";
import ProdLogger from "./ProdLogger";

let logger: typeof ProdLogger | DevLogger;

if (process.env.NODE_ENV === "production") {
   logger = new ProdLogger();
} else {
   logger = new DevLogger();
}

export default logger.buidLogger();
