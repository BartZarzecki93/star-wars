import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { TokenInterface } from "../interfaces/token";

import { clientRedis } from "./connection";

export function cache(req: Request, res: Response, next: NextFunction) {
  try {
    const decoded = jwt.verify(req.body.token, "secretkey");

    if (!decoded) return res.sendStatus(403);

    const userID = (decoded as TokenInterface).user._id;
    const resourceType = (req as { originalUrl: string }).originalUrl.replace(
      "/resources/",
      ""
    );

    clientRedis.get(
      resourceType + userID,
      (err: Error | null, data: string | null) => {
        if (err)
          return res.status(500).json({
            message: err
          });

        if (data !== null) {
          return res.status(201).json(JSON.parse(data));
        } else {
          next();
        }
      }
    );
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: e
    });
  }
}
