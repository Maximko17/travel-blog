import { injectable } from "inversify";
import { Token, TokenCreationAttributes } from "../models/Token";
import { ITokenRepository } from "./interfaces/ITokenRepository";

@injectable()
export class TokenRepositoryImpl implements ITokenRepository {
   findById = (id: number) => {
      return Token.findOne({ where: { id: id } });
   };

   save = (token: Token) => {
      return token.save();
   };

   create = (token: TokenCreationAttributes) => {
      return Token.create(token);
   };
}
