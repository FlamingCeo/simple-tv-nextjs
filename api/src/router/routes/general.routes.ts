import { Router, json } from "express";
import controller from "@modules/index.crm.module";

const seriesG: Router = Router();

seriesG.use(json({ limit: "25mb" }));

seriesG.get("/nav", controller.seriesController.GetNavController);

export default seriesG;
