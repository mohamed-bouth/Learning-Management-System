import express from "express";
import routes from "./routes.js";
import  errorHandler  from "./middleware/errorHandler.js";
import  notFound  from "./middleware/notFouond.js";

const app = express();

app.use(express.json());
app.use("/api", routes);

app.use(notFound);
app.use(errorHandler);

export default app;
