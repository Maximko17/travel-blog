import path from "path";
import { createLogger, format, transports } from "winston";
const { combine, timestamp, json, errors, splat, metadata } = format;

class ProdLogger {
   buidLogger() {
      return createLogger({
         format: combine(
            format((info) => {
               info.level = info.level.toUpperCase();
               return info;
            })(),
            timestamp(),
            errors({ stack: true }),
            splat(),
            metadata({ fillExcept: ["timestamp", "message", "level"] }),
            json()
         ),

         transports: [
            new transports.File({
               filename: path.resolve(__dirname, "../../logs/server.info.log"),
               level: "http",
            }),
            new transports.File({
               filename: path.resolve(__dirname, "../../logs/server.error.log"),
               level: "error",
            }),
         ],

         exceptionHandlers: [
            new transports.File({
               filename: path.resolve(
                  __dirname,
                  "../../logs/server.exceptions.log"
               ),
            }),
         ],
         rejectionHandlers: [
            new transports.File({
               filename: path.resolve(
                  __dirname,
                  "../../logs/server.exceptions.log"
               ),
            }),
         ],
      });
   }
}

export default ProdLogger;
