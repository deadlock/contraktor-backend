import { createExpressRouter } from "./src/config/routes";
import { createExpressServer } from "./src/config/server";

const port = process.env.PORT || 8080;
const environment = process.env.NODE_ENV || "development";

createExpressServer(createExpressRouter())
  .listen(port)
  .once("listening", () =>
    console.info("Server running", { port, environment })
  );
