import { ValidationError } from "joi";
import { AbstarctErrorHandler } from "./AbstractErrorHandler";

export class RequestValidationError extends AbstarctErrorHandler {
   statusCode = 400;

   constructor(public error: ValidationError) {
      super("Тело запроса не прошло валидацию");

      Object.setPrototypeOf(this, RequestValidationError.prototype);
   }

   serializeErrors() {
      return this.error.details.map((error) => ({
         message: error.message,
         field: error.context?.key,
      }));
   }
}
