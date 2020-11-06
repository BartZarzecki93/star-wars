import express, { Request, Response, NextFunction } from "express";
import { json } from "body-parser";
import usersRouter from "./routes/user";
import resourcesRouter from "./routes/resources";
import swaggerUi from "swagger-ui-express";
import mongoose from "mongoose";
import * as swaggerDocument from "./swagger.json";
import * as dotenv from "dotenv";
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(json());

app.use("/user", usersRouter);

app.use("/resources", resourcesRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: err.message });
});

mongoose.connect(
  process.env.DB_CONNECTION as string,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("DB connected")
);

app.listen(port, () => {
  console.info(`App listening on port ${port}!`);
});
