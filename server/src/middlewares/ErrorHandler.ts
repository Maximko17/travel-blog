import { Request, Response, NextFunction } from "express";
import { AbstarctErrorHandler } from "../errors/AbstractErrorHandler";

export const errorHandler = (
   err: Error,
   req: Request,
   res: Response,
   next: NextFunction
) => {
   if (err instanceof AbstarctErrorHandler) {
      return res.status(err.statusCode).send({ errors: err.serializeErrors() });
   }

   res.status(400).send({
      errors: [{ message: err.message || "Что-то пошло не так" }],
   });
};
