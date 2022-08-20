import {
   scrypt,
   randomBytes,
   timingSafeEqual,
   createCipheriv,
   createDecipheriv,
} from "crypto";
import { promisify } from "util";

const asyncScript = promisify(scrypt);

export class Crypto {
   private static readonly cipherAlghoritm = "aes-256-ctr";

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

      return timingSafeEqual(buf, Buffer.from(hashedValue, "hex"));
   }

   static encrypt(data: string): { iv: string; content: string } {
      const initVector = randomBytes(16);

      const cipher = createCipheriv(
         this.cipherAlghoritm,
         process.env.ENCRYPT_SECRET_KEY!,
         initVector
      );

      const encrypted = Buffer.concat([cipher.update(data), cipher.final()]);

      return {
         iv: initVector.toString("hex"),
         content: encrypted.toString("hex"),
      };
   }

   static decrypt(hash: { iv: string; content: string }): string {
      const decipher = createDecipheriv(
         this.cipherAlghoritm,
         process.env.ENCRYPT_SECRET_KEY!,
         Buffer.from(hash.iv, "hex")
      );

      const decrpyted = Buffer.concat([
         decipher.update(hash.content, "hex"),
         decipher.final(),
      ]);

      return decrpyted.toString();
   }
}
