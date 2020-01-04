import { Express, Request, Response } from "express";

export const setRouter = (app: Express) => {
  app.get("/", (_: Request, res: Response) =>
    res.status(200).send("Hello World")
  );
};
