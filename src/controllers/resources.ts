import { RequestHandler, Response, Request } from "express";
import jwt from "jsonwebtoken";
import StarWarsService from "../service/starwars-service";
import { TokenInterface } from "../interfaces/token";
import { clientRedis } from "../redis/connection";

export const findResource: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const decoded = jwt.verify(req.body.token, "secretkey");

    if (!decoded) return res.sendStatus(401);

    const heroId = (decoded as TokenInterface).user.heroId;
    const itemId = (req.params as { id: string }).id;
    const userID = (decoded as TokenInterface).user._id;
    const resourceType = (req as { originalUrl: string }).originalUrl
      .replace("/resources/", "")
      .replace(`/${itemId}`, "");

    const resource = await StarWarsService.findResources(
      heroId,
      resourceType,
      itemId
    );

    if (typeof resource == "object") {
      const myJSON = JSON.stringify(resource);
      clientRedis.setex(
        (req as { originalUrl: string }).originalUrl.replace(
          "/resources/",
          ""
        ) + userID,
        86400,
        myJSON
      );

      return res.status(201).json(resource);
    }

    return res.status(404).json({
      message: resource
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: e
    });
  }
};

export const allResources: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const decoded = jwt.verify(req.body.token, "secretkey");

    if (!decoded) return res.sendStatus(401);

    const heroId = (decoded as TokenInterface).user.heroId;
    const userID = (decoded as TokenInterface).user._id;
    const resourceType = (req as { originalUrl: string }).originalUrl.replace(
      "/resources/",
      ""
    );

    const resources = await StarWarsService.getResources(heroId, resourceType);

    if (Array.isArray(resources)) {
      const myJSON = JSON.stringify(resources);
      clientRedis.setex(resourceType + userID, 86400, myJSON);
      console.log("casehd");
      return res.status(201).json(resources);
    }
    return res.status(404).json({
      message: resources
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: e
    });
  }
};
