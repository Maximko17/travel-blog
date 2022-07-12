import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";
import { RequestValidationError } from "../errors/RequestValidationError";

export const validateRequestBody =
   (schema: ObjectSchema<any>) =>
   (req: Request, res: Response, next: NextFunction) => {
      const { error, value } = schema.validate(req.body, { abortEarly: false });

      if (error) {
         throw new RequestValidationError(error);
      }

      next();
   };
