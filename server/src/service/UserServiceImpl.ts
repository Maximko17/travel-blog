import { inject, injectable } from "inversify";
import DI_TYPES from "../config/DIContainerTypes";
import { RoleName } from "../models/Role";
import { User } from "../models/User";
import { IUserRepository } from "../repository/interfaces/IUserRepository";
import { Crypto } from "../utils/Crypto";
import { IRoleService } from "./interfaces/IRoleService";
import { IUserService, IUserSignUpInfo } from "./interfaces/IUserService";

@injectable()
export class UserServiceImpl implements IUserService {
   @inject(DI_TYPES.IUserRepository)
   private readonly _userRepository!: IUserRepository;

   @inject(DI_TYPES.IRoleService)
   private readonly _roleService!: IRoleService;

   signUp = async (userInfo: IUserSignUpInfo) => {
      const { login, password, confirmPassword } = userInfo;

      const existUser = await this._userRepository.findByLogin(login);
      if (existUser) {
         throw new Error("Пользователь с таким логином уже существует");
      }
      if (password !== confirmPassword) {
         throw new Error("Пароли не совпадают");
      }
      const hashedPassword = await Crypto.toHash(password);

      const role = await this._roleService.findByRoleName(RoleName.USER);
      const newUser = User.build({
         login: login,
         password: hashedPassword,
         roleId: role.id,
      });

      const user = await this._userRepository.save(newUser);

      console.log(user);
   };

   logIn = () => {};
}
