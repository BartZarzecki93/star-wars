import { NextFunction, Response, Request } from "express";

export function verifyToken(req: Request, res: Response, next: NextFunction) {
  const bearerHeader = req.headers["authorization"];

  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");

    const bearerToken = bearer[1];

    req.body.token = bearerToken;

    next();
  } else {
    res.sendStatus(403);
  }
}
