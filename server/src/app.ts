import express from "express";
import UserController from "./controllers/UserController";
import { NotFoundError } from "./errors/NotFoundError";
import { errorHandler } from "./middlewares/ErrorHandler";

const app = express();

app.use("/api/user", UserController);

app.all("*", () => {
   throw new NotFoundError();
});

app.use(errorHandler);

export { app };
