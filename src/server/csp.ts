import nanoid from "nanoid";
import { Response, NextFunction, Request } from "express";
import helmet from "helmet";
import { UAParser } from "ua-parser-js";

export const generateNonceID = (
  _: Request,
  res: Response,
  next: NextFunction
) => {
  res.locals.nonce = Buffer.from(nanoid(32)).toString("base64");
  next();
};

const commonDirectives: helmet.IHelmetContentSecurityPolicyDirectives = {
  defaultSrc: ["'self'"],
  styleSrc: ["'unsafe-inline'", "fonts.googleapis.com"],
  fontSrc: ["'self'", "data: fonts.gstatic.com"],
  connectSrc: ["'self'", "fonts.googleapis.com", "fonts.gstatic.com"],
  workerSrc: ["'self'"]
};

// For chrome, firefox
export const lv3Directives: helmet.IHelmetContentSecurityPolicyDirectives = {
  ...commonDirectives,
  scriptSrc: [
    (_, res) => `'nonce-${res.locals.nonce}'`,
    "'strict-dynamic'",
    "'usafe-eval'"
  ]
};

export const lv2Directives: helmet.IHelmetContentSecurityPolicyDirectives = {
  ...commonDirectives,
  scriptSrc: [
    "'self'",
    (_, res) => `'nonce-${res.locals.nonce}'`,
    "'unsafe-eval'",
    "'unsafe-inline'"
  ]
};

const isLv3 = (ua?: string) => {
  return ["Chrome", "Firefox"].includes(
    new UAParser(ua).getBrowser().name || ""
  );
};

export const contentSecurityPolicy = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  helmet.contentSecurityPolicy({
    directives: isLv3(req.headers["user-agent"]) ? lv3Directives : lv2Directives
  })(req, res, next);
};
