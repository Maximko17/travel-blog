import { RoleName } from "../models/Role";
import { User } from "../models/User";
import { IUserRepository } from "../repository/interfaces/IUserRepository";
import { Crypto } from "../utils/Crypto";
import { IRoleService } from "./interfaces/IRoleService";
import { IUserService, IUserSignUpInfo } from "./interfaces/IUserService";

export class UserServiceImpl implements IUserService {
   private readonly _userRepository: IUserRepository;
   private readonly _roleService: IRoleService;

   constructor(userRepository: IUserRepository, roleService: IRoleService) {
      this._userRepository = userRepository;
      this._roleService = roleService;
   }

   signUp = async (userInfo: IUserSignUpInfo) => {
      const { login, password, confirmPassword } = userInfo;

      console.log(Object.values(RoleName));

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
