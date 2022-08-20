import express from "express";
import { injectable } from "inversify";
import morgan from "morgan";
import "reflect-metadata";
import DIContainer from "./config/DIContainer";
import DI_TYPES from "./config/DIContainerTypes";
import { UserController } from "./controllers/UserController";
import { NotFoundError } from "./errors/NotFoundError";
import logger from "./logger";
import { errorHandler } from "./middlewares/ErrorHandler";

@injectable()
export class AppBootstrap {
   private readonly _app;
   private readonly _diContainer;

   constructor() {
      this._app = express();
      this._diContainer = DIContainer.getContainer();
      this.setMiddlewares();
      this.setRoutes();
   }

   setMiddlewares() {
      this._app.use(
         morgan(":method :url :status - :response-time ms", {
            stream: {
               write: (message) => logger.http(message.trim()),
            },
         })
      );
   }

   setRoutes = () => {
      const userRoutes = this._diContainer
         .get<UserController>(DI_TYPES.UserController)
         .getRoutes(express.Router());

      this._app.use(userRoutes);
      this._app.all("*", () => {
         throw new NotFoundError();
      });
      this._app.use(errorHandler);
   };

   getApp() {
      return this._app;
   }
}
