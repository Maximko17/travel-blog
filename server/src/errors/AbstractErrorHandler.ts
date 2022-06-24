export abstract class AbstarctErrorHandler extends Error {
   abstract statusCode: number;

   constructor(message: string) {
      super(message);

      Object.setPrototypeOf(this, AbstarctErrorHandler.prototype);
   }

   abstract serializeErrors(): {
      message: string;
      field?: string;
   }[];
}
