import express, { Request, Response, NextFunction } from "express";
import path from "path";
import bodyParser from "body-parser";
import helmet from "helmet";

import setHeaders from "../routes/headers";
import landingRoute from "../routes/landing";
import userRoutes from "../routes/user";
import postRoutes from "../routes/posts";
import error404 from "../routes/error404";

import { config } from "../util/config";

interface ErrorStatusCode extends Error {
  httpStatusCode: number;
}

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

// Parsing the request
app.use(express.json()); // Content-type
app.use(bodyParser.urlencoded({ extended: false })); // Content-type x-www-form-urlencoded

app.use(express.static(path.join(__dirname, "..", "public")));

app.use(setHeaders);

app.use(helmet.hidePoweredBy());

app.use((req: Request, res: Response, next: NextFunction) => {
  res.locals.isAuthenticated = req.body.username;
  next();
});

app.use(landingRoute);
app.use(userRoutes);
app.use("/post", postRoutes);

app.use(error404);

app.use(
  (
    error: ErrorStatusCode,
    _req: Request,
    res: Response,
    _next: NextFunction
  ) => {
    res.status(error.httpStatusCode).json({
      error: error,
    });
  }
);

export default app.listen(config.PORT || 3000);
