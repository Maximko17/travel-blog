import { scrypt, randomBytes, timingSafeEqual } from "crypto";
import { promisify } from "util";

const asyncScript = promisify(scrypt);

export class Crypto {
   static async toHash(value: string): Promise<string> {
      const salt = randomBytes(8).toString("hex");
      const buf = (await asyncScript(value, salt, 64)) as Buffer;

      return `${salt}.${buf.toString("hex")}`;
   }

   static async compareHash(
      storedHash: string,
      suppliedHash: string
   ): Promise<boolean> {
      const [salt, hashedValue] = storedHash.split(".");
      const buf = (await asyncScript(suppliedHash, salt, 64)) as Buffer;

      return timingSafeEqual(buf, Buffer.from(hashedValue));
   }
}
