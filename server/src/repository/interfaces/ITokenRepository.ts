import { Token, TokenCreationAttributes } from "../../models/Token";

export interface ITokenRepository {
   findById: (id: number) => Promise<Token | null>;

   save: (token: Token) => Promise<Token>;

   create: (token: TokenCreationAttributes) => Promise<Token>;
}
