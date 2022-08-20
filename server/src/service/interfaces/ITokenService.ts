import { Token } from "../../models/Token";
import { User } from "../../models/User";

export interface ITokenService {
   createToken: (
      token: Token | null,
      user: User
   ) => Promise<{ initToken: string; encryptedToken: string }>;
}
