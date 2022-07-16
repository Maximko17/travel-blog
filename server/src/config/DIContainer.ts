import { Container } from "inversify";
import { UserController } from "../controllers/UserController";
import { RoleRepositoryImpl, UserRepositoryImpl } from "../repository";
import { IRoleRepository } from "../repository/interfaces/IRoleRepository";
import { IUserRepository } from "../repository/interfaces/IUserRepository";
import { RoleServiceImpl, UserServiceImpl } from "../service";
import { IRoleService } from "../service/interfaces/IRoleService";
import { IUserService } from "../service/interfaces/IUserService";
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
   }

   private configureServices() {
      this._diContainer
         .bind<IUserService>(DI_TYPES.IUserService)
         .to(UserServiceImpl);
      this._diContainer
         .bind<IRoleService>(DI_TYPES.IRoleService)
         .to(RoleServiceImpl);
   }

   private configureControllers() {
      this._diContainer
         .bind<UserController>(DI_TYPES.UserController)
         .to(UserController);
   }

   getContainer() {
      return this._diContainer;
   }
}

export default new DIContainer();
