import express from "express";
import compression from "compression";
import { createServer } from "http";
import { generateNonceID, contentSecurityPolicy } from "./csp";
import { setRouter } from "./router";

const useHMR = (app: express.Express) => {
  if (process.env.NODE_ENV === "development") {
    const webpack = require("webpack");
    const webpackHotMiddleware = require("webpack-hot-middleware");
    const webpackDevMiddleware = require("webpack-dev-middleware");
    const config = require("../../webpack.client.config");
    const compiler = webpack(config);

    app.use(webpackHotMiddleware(compiler));
    app.use(
      webpackDevMiddleware(compiler, {
        publicPath: config.output.publicPath,
        writeToDisk(filePath: string) {
          return /loadable-stats/.test(filePath);
        }
      })
    );
  }
};

export const runServer = () => {
  const app = express();

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.use(generateNonceID);
  app.use(contentSecurityPolicy);

  app.use(compression({ level: 5 }));

  useHMR(app);

  setRouter(app);

  if (process.env.NODE_ENV !== "test") {
    const server = createServer(app);
    const port = process.env.PORT || "8080";
    server.listen(port, () => {
      // eslint-disable-next-line no-console
      console.log(`Listening on ${port}`);
    });
  }
};
