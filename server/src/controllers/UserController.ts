import app, { NextFunction, Request, Response, Router } from "express";
import { validateRequestBody } from "../middlewares/RequestBodyValidator";
import {
   IUserLogInInfo,
   IUserService,
   IUserSignUpInfo,
} from "../service/interfaces/IUserService";
import {
   logInSchema,
   signInSchema,
} from "./request-validation-shemas/UserShemas";
import { inject, injectable } from "inversify";
import DI_TYPES from "../config/DIContainerTypes";

@injectable()
export class UserController {
   private readonly _BASE_ROUTE = "/api/user";
   private readonly _ROUTES = {
      signUp: `${this._BASE_ROUTE}/signup`,
      logIn: `${this._BASE_ROUTE}/login`,
   };

   @inject(DI_TYPES.IUserService)
   private readonly _userService!: IUserService;

   getRoutes = (router: Router) => {
      router.post(
         this._ROUTES.signUp,
         app.json(),
         validateRequestBody(signInSchema),
         this.signUp
      );
      router.post(
         this._ROUTES.logIn,
         app.json(),
         validateRequestBody(logInSchema),
         this.logIn
      );

      return router;
   };

   signUp = async (
      req: Request<{}, {}, IUserSignUpInfo, {}>,
      res: Response,
      next: NextFunction
   ) => {
      try {
         const { login, confirmPassword, password } = req.body;
         const tokens = await this._userService.signUp({
            login,
            password,
            confirmPassword,
         });
         res.status(201).send(tokens);
      } catch (error) {
         next(error);
      }
   };

   logIn = async (
      req: Request<{}, {}, IUserLogInInfo, {}>,
      res: Response,
      next: NextFunction
   ) => {
      try {
         const { login, password } = req.body;
         const tokens = await this._userService.logIn({
            login,
            password,
         });
         res.status(200).send(tokens);
      } catch (error) {
         next(error);
      }
   };
}
