import express from "express";
import { userRoutes } from "./controller/UserRoutes";

const app = express();

app.use(userRoutes);

export { app };
