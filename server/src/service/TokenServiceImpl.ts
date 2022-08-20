import { randomBytes } from "crypto";
import { inject, injectable } from "inversify";
import DI_TYPES from "../config/DIContainerTypes";
import { Token } from "../models/Token";
import { User } from "../models/User";
import { ITokenRepository } from "../repository/interfaces/ITokenRepository";
import { Crypto } from "../utils/Crypto";
import { ITokenService } from "./interfaces/ITokenService";

@injectable()
export class TokenServiceImpl implements ITokenService {
   @inject(DI_TYPES.ITokenRepository)
   private readonly _tokenRepository!: ITokenRepository;

   // Генерация refresh token и его шифорвание
   private generateToken = () => {
      const randomString = randomBytes(16).toString("hex");
      const encryptedRandomString = Crypto.encrypt(randomString);

      return {
         initToken: randomString,
         encryptedToken: encryptedRandomString,
      };
   };

   /* 
      Если рефреш токен клиента уже существует в базе данных, то происходит обновление его значения
      Иначе создается новая запись в бд с зашифрованным значение токена  
    */
   createToken = async (token: Token | null, user: User) => {
      const { initToken, encryptedToken } = this.generateToken();
      if (token) {
         token.set({
            token: encryptedToken.content,
         });
         await this._tokenRepository.save(token);
      } else {
         await this._tokenRepository.create({
            userId: user.id,
            token: encryptedToken.content,
            iv: encryptedToken.iv,
         });
      }

      return { initToken, encryptedToken: encryptedToken.content };
   };
}
