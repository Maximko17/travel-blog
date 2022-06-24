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

   console.log(err);
   res.status(400).send({ errors: [{ message: "Что-то пошло не так" }] });
};
