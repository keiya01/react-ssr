import express, { Express } from "express";
import * as renderer from "./controller/renderer";

export const setRouter = (app: Express) => {
  app.use("/public", express.static("dist/client"));
  app.use(
    "/service-worker.js",
    express.static("dist/client/service-worker.js")
  );
  app.use(
    "/manifest.webmanifest",
    express.static("dist/client/manifest.webmanifest")
  );

  app.get("*", renderer.handleRender);
};
