import express from "express";
import { userRoutes } from "./controller/UserRoutes";
import { NotFoundError } from "./errors/NotFoundError";
import { errorHandler } from "./middleware/ErrorHandler";

const app = express();

app.use(userRoutes);

app.all("*", () => {
   throw new NotFoundError();
});

app.use(errorHandler);

export { app };
