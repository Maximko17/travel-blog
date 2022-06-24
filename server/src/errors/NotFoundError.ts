import { AbstarctErrorHandler } from "./AbstractErrorHandler";

export class NotFoundError extends AbstarctErrorHandler {
   statusCode = 404;

   constructor() {
      super("Страница не найдена");

      Object.setPrototypeOf(this, NotFoundError.prototype);
   }

   serializeErrors() {
      return [{ message: "Страница не найдена" }];
   }
}
