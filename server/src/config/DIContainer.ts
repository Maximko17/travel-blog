import { Container } from "inversify";
import { AppBootstrap } from "../AppBootstrap";
import { UserController } from "../controllers/UserController";
import { RoleRepositoryImpl, UserRepositoryImpl } from "../repository";
import { IRoleRepository } from "../repository/interfaces/IRoleRepository";
import { ITokenRepository } from "../repository/interfaces/ITokenRepository";
import { IUserRepository } from "../repository/interfaces/IUserRepository";
import { TokenRepositoryImpl } from "../repository/TokenRepositoryImpl";
import { RoleServiceImpl, UserServiceImpl } from "../service";
import { IRoleService } from "../service/interfaces/IRoleService";
import { ITokenService } from "../service/interfaces/ITokenService";
import { IUserService } from "../service/interfaces/IUserService";
import { TokenServiceImpl } from "../service/TokenServiceImpl";
import DI_TYPES from "./DIContainerTypes";

export class DIContainer {
   private _diContainer: Container;

   constructor() {
      this._diContainer = new Container();

      this.configureRepositories();
      this.configureServices();
      this.configureControllers();
   }

   private configureRepositories() {
      this._diContainer
         .bind<IUserRepository>(DI_TYPES.IUserRepository)
         .to(UserRepositoryImpl);
      this._diContainer
         .bind<IRoleRepository>(DI_TYPES.IRoleRepository)
         .to(RoleRepositoryImpl);
      this._diContainer
         .bind<ITokenRepository>(DI_TYPES.ITokenRepository)
         .to(TokenRepositoryImpl);
   }

   private configureServices() {
      this._diContainer
         .bind<IUserService>(DI_TYPES.IUserService)
         .to(UserServiceImpl);
      this._diContainer
         .bind<IRoleService>(DI_TYPES.IRoleService)
         .to(RoleServiceImpl);
      this._diContainer
         .bind<ITokenService>(DI_TYPES.ITokenService)
         .to(TokenServiceImpl);
   }

   private configureControllers() {
      this._diContainer
         .bind<AppBootstrap>(DI_TYPES.AppBootstrap)
         .to(AppBootstrap);
      this._diContainer
         .bind<UserController>(DI_TYPES.UserController)
         .to(UserController);
   }

   getContainer() {
      return this._diContainer;
   }
}

export default new DIContainer();
