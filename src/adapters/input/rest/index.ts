import express, { Application, Request, Response } from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import routes from "./routes";


const port = process.env.PORT || 3000;

export const getExpressApp = () => {
  const app: Application = express();

  // Body parsing Middleware
  app.use(logger("dev"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, "public")));

  app.get("/", async (req: Request, res: Response): Promise<Response> => {
    return res.status(200).send({ message: `It works!` });
  });

  app.use("/api/v1", routes);

  return app;
};

export const startExpressApp = () => {
  const app = getExpressApp();
  try {
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  } catch (error: any) {
    console.log(`Error occurred: ${error.message}`);
  }
};
