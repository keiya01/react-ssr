import express, { Express } from "express";
import * as renderer from "./controller/renderer";

export const setRouter = (app: Express) => {
  app.use("/public", express.static("dist/client"));
  app.get("*", renderer.handleRender);
};
