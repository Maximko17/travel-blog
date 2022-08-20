import { createLogger, format, transports } from "winston";
const { combine, timestamp, printf, colorize, errors, splat, metadata } =
   format;

const printFormat = printf((info) => {
   info.message =
      info.message instanceof Object
         ? JSON.stringify(info.message)
         : info.message;

   return `${info.timestamp} [${info.level}] ${
      info.metadata?.stack || info.message
   } `;
});

class DevLogger {
   buidLogger() {
      return createLogger({
         format: combine(
            format((info) => {
               info.level = info.level.toUpperCase();
               return info;
            })(),
            colorize({
               colors: { info: "cyan", debug: "green", http: "magenta" },
            }),
            timestamp({ format: "HH:mm:ss" }),
            errors({ stack: true }),
            splat(),
            metadata({ fillExcept: ["timestamp", "message", "level"] }),
            printFormat
         ),

         transports: [new transports.Console({ level: "debug" })],

         exceptionHandlers: [new transports.Console()],
         rejectionHandlers: [new transports.Console()],
      });
   }
}

export default DevLogger;
