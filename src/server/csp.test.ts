import { Response, Request } from "express";
import {
  generateNonceID,
  contentSecurityPolicy,
  lv3Directives,
  lv2Directives
} from "./csp";
import helmet from "helmet";

describe("generateNonceID()", () => {
  it("should be set random value to res.locals.nonce", () => {
    const req = jest.fn();
    const res: { locals: Response["locals"] } = {
      locals: {}
    };
    const next = jest.fn();

    generateNonceID(req as any, res as any, next as any);

    expect(next.mock.calls.length).toBe(1);
    expect(typeof res.locals.nonce).toEqual("string");
  });
});

describe("contentSecurityPolicy()", () => {
  const res: { locals: Response["locals"]; setHeader: any } = {
    locals: {},
    setHeader: jest.fn()
  };
  const next = jest.fn();
  let spyCSP: any = null;

  beforeEach(() => {
    spyCSP = jest.spyOn(helmet, "contentSecurityPolicy");
    generateNonceID({} as any, res as any, next as any);
  });

  afterEach(() => {
    spyCSP.mockClear();
  });

  it("should be lv3 directives when user-agent is Chrome", () => {
    const req: { headers: Request["headers"] } = {
      headers: {
        "user-agent":
          "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36"
      }
    };

    generateNonceID(req as any, res as any, next as any);
    contentSecurityPolicy(req as any, res as any, next as any);

    expect(spyCSP.mock.calls.length).toBe(1);
    expect(spyCSP.mock.calls[0][0]).toEqual({ directives: lv3Directives });
  });

  it("should be lv3 directives when user-agent is Firefox", () => {
    const req: { headers: Request["headers"] } = {
      headers: {
        "user-agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X x.y; rv:42.0) Gecko/20100101 Firefox/42.0"
      }
    };

    contentSecurityPolicy(req as any, res as any, next as any);

    expect(spyCSP.mock.calls.length).toBe(1);
    expect(spyCSP.mock.calls[0][0]).toEqual({ directives: lv3Directives });
  });

  it("should be lv3 directives when user-agent is Safari", () => {
    const req: { headers: Request["headers"] } = {
      headers: {
        "user-agent":
          "Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_1 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Version/10.0 Mobile/14E304 Safari/602.1"
      }
    };

    contentSecurityPolicy(req as any, res as any, next as any);

    expect(spyCSP.mock.calls.length).toBe(1);
    expect(spyCSP.mock.calls[0][0]).toEqual({ directives: lv2Directives });
  });
});
