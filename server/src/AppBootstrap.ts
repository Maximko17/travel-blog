import "reflect-metadata";
import express from "express";
import { Container } from "inversify";
import DIContainer from "./config/DIContainer";
import DI_TYPES from "./config/DIContainerTypes";
import { UserController } from "./controllers/UserController";
import { NotFoundError } from "./errors/NotFoundError";
import { errorHandler } from "./middlewares/ErrorHandler";

export class AppBootstrap {
   private readonly _app;
   private readonly _diContainer: Container;

   constructor() {
      this._app = express();
      this._diContainer = DIContainer.getContainer();
      this.setRoutes();
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
