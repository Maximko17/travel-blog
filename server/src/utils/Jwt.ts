import jwt from "jsonwebtoken";

export class JWT {
   private static readonly ACCESS_TOKEN_TIMEOUT = 1000 * 60 * 15;
   private static readonly REFRESH_TOKEN_TIMEOUT = "30d";

   public static signAccessJwt(payload: any): string {
      const token = jwt.sign(payload, process.env.JWT_ACCESS_SECRET!, {
         expiresIn: this.ACCESS_TOKEN_TIMEOUT,
      });
      return token;
   }

   public static signRefreshJwt(payload: any): string {
      const token = jwt.sign(payload, process.env.JWT_REFRESH_SECRET!, {
         expiresIn: this.REFRESH_TOKEN_TIMEOUT,
      });
      return token;
   }
}
