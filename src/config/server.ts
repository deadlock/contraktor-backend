import * as Server from "express";
import * as BodyParser from "body-parser";
import * as CORS from "cors";

export function createExpressServer(router: Server.Router): Server.Express {
  const app: Server.Express = Server();

  app.disable("x-powered-by");
  app.use(CORS());
  app.use(
    (
      _request: Server.Request,
      response: Server.Response,
      next: Server.NextFunction
    ) => {
      response.header("Access-Control-Allow-Origin", "*");
      response.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
      );
      next();
    }
  );

  app.use(BodyParser.urlencoded({ extended: false }));
  app.use(BodyParser.json());
  app.use("/rest/v1/", Server.static("public"));
  app.use(router);

  return app;
}
