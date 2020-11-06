import { Router } from "express";
import { allResources, findResource } from "../controllers/resources";
import { verifyToken } from "../validation/verifyToken";
import { cache } from "../redis/cache";

const resourcesRouter = Router();

//GET

resourcesRouter.get("/films", verifyToken, cache, allResources);

resourcesRouter.get("/species", verifyToken, cache, allResources);

resourcesRouter.get("/vehicles", verifyToken, cache, allResources);

resourcesRouter.get("/starships", verifyToken, cache, allResources);

resourcesRouter.get("/planets", verifyToken, cache, allResources);

//FIND

resourcesRouter.get("/films/:id", verifyToken, cache, findResource);

resourcesRouter.get("/species/:id", verifyToken, cache, findResource);

resourcesRouter.get("/vehicles/:id", verifyToken, cache, findResource);

resourcesRouter.get("/starships/:id", verifyToken, cache, findResource);

resourcesRouter.get("/planets/:id", verifyToken, cache, findResource);

export default resourcesRouter;
