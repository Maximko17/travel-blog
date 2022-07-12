import app, { NextFunction, Request, Response, Router } from "express";
import { validateRequestBody } from "../middlewares/RequestBodyValidator";
import { RoleRepositoryImpl, UserRepositoryImpl } from "../repository";
import { RoleServiceImpl, UserServiceImpl } from "../service";
import { IUserSignUpInfo } from "../service/interfaces/IUserService";
import { signInSchema } from "./request-validation-shemas/UserShemas";

const router = Router();

class UserController {
   constructor() {
      router.post(
         "/signup",
         app.json(),
         validateRequestBody(signInSchema),
         this.signUp
      );
   }

   signUp = async (
      req: Request<{}, {}, IUserSignUpInfo, {}>,
      res: Response,
      next: NextFunction
   ) => {
      try {
         const { login, confirmPassword, password } = req.body;
         await new UserServiceImpl(
            new UserRepositoryImpl(),
            new RoleServiceImpl(new RoleRepositoryImpl())
         ).signUp({
            login,
            password,
            confirmPassword,
         });
         res.status(200).send();
      } catch (error) {
         next(error);
      }
   };
}

new UserController();

export default router;
