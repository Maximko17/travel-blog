import { inject, injectable } from "inversify";
import sequelize from "../config/DBConfig";
import DI_TYPES from "../config/DIContainerTypes";
import logger from "../logger";
import { RoleName } from "../models/Role";
import { IUserRepository } from "../repository/interfaces/IUserRepository";
import { Crypto } from "../utils/Crypto";
import { JWT } from "../utils/Jwt";
import { IRoleService } from "./interfaces/IRoleService";
import { ITokenService } from "./interfaces/ITokenService";
import {
   IUserLogInInfo,
   IUserService,
   IUserSignUpInfo,
} from "./interfaces/IUserService";

@injectable()
export class UserServiceImpl implements IUserService {
   @inject(DI_TYPES.IUserRepository)
   private readonly _userRepository!: IUserRepository;

   @inject(DI_TYPES.IRoleService)
   private readonly _roleService!: IRoleService;

   @inject(DI_TYPES.ITokenService)
   private readonly _tokenService!: ITokenService;

   signUp = async (userInfo: IUserSignUpInfo) => {
      try {
         return await sequelize.transaction(async () => {
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

            const newUser = await this._userRepository.create({
               login: login,
               password: hashedPassword,
               roleId: role.id,
            });

            // Создание нового рефреш токена
            const { initToken } = await this._tokenService.createToken(
               null,
               newUser
            );

            const accessToken = JWT.signAccessJwt({
               login: newUser.login,
               role: role.name,
            });

            // Создание Refresh JWT для клиета. Внутри него инфо: id юзера и само значение рефреш токена (рандомная строчка 16 байт).
            // Значение рефреш токена в JWT не зашифорвано и будет сравниваться в дальнейшем с зашифрованным из базы данных
            const refreshToken = JWT.signRefreshJwt({
               userId: newUser.id,
               refreshToken: initToken,
            });

            return { accessToken, refreshToken };
         });
      } catch (error) {
         const msgErr = "Ошибка регистрации нового пользователя";
         logger.error(msgErr);
         logger.error(error);
         throw new Error(msgErr);
      }
   };

   logIn = async (userInfo: IUserLogInInfo) => {
      try {
         return await sequelize.transaction(async () => {
            const { login, password } = userInfo;

            const user = await this._userRepository.findByLogin(login);
            if (!user) {
               throw new Error("Неверное имя пользователя или пароль");
            }

            const isCorrectPassword = await Crypto.compareHash(
               user.password,
               password
            );
            if (!isCorrectPassword) {
               throw new Error("Неверное имя пользователя или пароль");
            }

            // Замена старого рефреш токена или создание нового, в случае его отсутствия
            const { initToken } = await this._tokenService.createToken(
               await user.$get("token"),
               user
            );

            const accessToken = JWT.signAccessJwt({
               login: user.login,
               role: await user.$get("role").then((role) => role!.name),
            });

            // Создание Refresh JWT для клиета. Внутри него инфо: id юзера и само значение рефреш токена (рандомная строчка 16 байт).
            // Значение рефреш токена в JWT не зашифорвано и будет сравниваться в дальнейшем с зашифрованным из базы данных
            const refreshToken = JWT.signRefreshJwt({
               userId: user.id,
               refreshToken: initToken,
            });

            return { accessToken, refreshToken };
         });
      } catch (error) {
         const msgErr = "Ошибка входа пользователя на сайт";
         logger.error(msgErr);
         logger.error(error);
         throw new Error(msgErr);
      }
   };
}
