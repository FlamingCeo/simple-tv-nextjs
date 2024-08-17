import { Router, json } from "express";
import controller from "@modules/index.crm.module";

const seriesR: Router = Router();

seriesR.use(json({ limit: "25mb" }));


// Series routes
seriesR.post("/series", controller.seriesController.AddSeries);
seriesR.put("/series/:id", controller.seriesController.UpdateSeries);
seriesR.delete("/series/:id", controller.seriesController.DeleteSeries);
seriesR.get("/series/:id", controller.seriesController.GetSeriesById);

// Season routes
seriesR.post("/season", controller.seriesController.AddSeason);
seriesR.put("/season/:id", controller.seriesController.UpdateSeason);
seriesR.delete("/season/:id", controller.seriesController.DeleteSeason);
seriesR.get("/season/:id", controller.seriesController.GetSeasonById);

// Episode routes
seriesR.post("/episode", controller.seriesController.AddEpisode);
seriesR.put("/episode/:id", controller.seriesController.UpdateEpisode);
seriesR.delete("/episode/:id", controller.seriesController.DeleteEpisode);
seriesR.get("/episode/:id", controller.seriesController.GetEpisodeById);
export default seriesR;
