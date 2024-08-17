import { NextFunction, Request, Response } from "express";
import { Series } from "@models/series.crm.model";
import { Season } from "@models/season.crm.model";
import { Episode } from "@models/episode.crm.model";
import {
  PasswordValidator,
  ValidationHelper as VH,
} from "@utils/helpers/validation.helper";
import { Console } from "console";

const GetNavController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
  const series = await Series.findAll({
    include: [
      {
        model: Season,
        as: "seasons",
        include: [
          {
            model: Episode,
            as: "episodes",
          },
        ],
      },
    ],
    order: [["name", "ASC"]], // Order by the series name alphabetically
  });

      console.log(series);

return res.json(series)

  } catch (err) {
    next(err);
  }
};

// Add Series
const AddSeries = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Validate request body
    const vh: any = VH.checkRequestBody(Series.getAttributes(), req.body, [
      "name",
    ]);

    // Ensure series_id is not part of the request body if it is auto-generated
    // Remove series_id from vh if it is included
    delete vh.series_id;

    const newSeries = await Series.create({ ...vh });
    return res.status(201).json(newSeries);
  } catch (err) {
    next(err);
  }
};


// Update Series
const UpdateSeries = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const series = await Series.findByPk(id);
    if (!series) {
      return res.status(404).json({ message: "Series not found" });
    }
    series.name = name;
    await series.save();
    return res.json(series);
  } catch (err) {
    next(err);
  }
};

// Delete Series
const DeleteSeries = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const series = await Series.findByPk(id);
    if (!series) {
      return res.status(404).json({ message: "Series not found" });
    }
    await series.destroy();
    return res.status(204).send();
  } catch (err) {
    next(err);
  }
};

// Get Series by ID
const GetSeriesById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const series = await Series.findByPk(id, {
      include: [
        {
          model: Season,
          as: "seasons",
          include: [
            {
              model: Episode,
              as: "episodes",
            },
          ],
        },
      ],
    });
    if (!series) {
      return res.status(404).json({ message: "Series not found" });
    }
    return res.json(series);
  } catch (err) {
    next(err);
  }
};

// Add Season
const AddSeason = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
       const vh: any = VH.checkRequestBody(Season.getAttributes(), req.body, [
         "series_id","name","no"
       ]);
        delete vh.season_id;

    const newSeason = await Season.create({ ...vh });
    return res.status(201).json(newSeason);
  } catch (err) {
    next(err);
  }
};

// Update Season
const UpdateSeason = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { name, no } = req.body;
    const season = await Season.findByPk(id);
    if (!season) {
      return res.status(404).json({ message: "Season not found" });
    }
    season.name = name;
    season.no = no;
    await season.save();
    return res.json(season);
  } catch (err) {
    next(err);
  }
};

// Delete Season
const DeleteSeason = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const season = await Season.findByPk(id);
    if (!season) {
      return res.status(404).json({ message: "Season not found" });
    }
    await season.destroy();
    return res.status(204).send();
  } catch (err) {
    next(err);
  }
};

// Get Season by ID
const GetSeasonById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const season = await Season.findByPk(id, {
      include: [
        {
          model: Episode,
          as: "episodes",
        },
      ],
    });
    if (!season) {
      return res.status(404).json({ message: "Season not found" });
    }
    return res.json(season);
  } catch (err) {
    next(err);
  }
};

// Add Episode
const AddEpisode = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Validate and extract necessary fields from the request body
    const vh: any = VH.checkRequestBody(Episode.getAttributes(), req.body, [
      "series_id",
      "season_id",
      "name",
      "no",
    ]);

    delete vh.episode_id;
    console.log("pppppp",vh)


    const newEpisode = await Episode.create({ ...vh });

    return res.status(201).json(newEpisode);
  } catch (err) {
    // Handle unique constraint violation errors or other specific errors
   console.log(err)

    // Pass other errors to the next middleware for handling
    next(err);
  }
};


// Update Episode
const UpdateEpisode = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { name, no } = req.body;
    const episode = await Episode.findByPk(id);
    if (!episode) {
      return res.status(404).json({ message: "Episode not found" });
    }
    episode.name = name;
    episode.no = no;
    await episode.save();
    return res.json(episode);
  } catch (err) {
    next(err);
  }
};

// Delete Episode
const DeleteEpisode = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const episode = await Episode.findByPk(id);
    if (!episode) {
      return res.status(404).json({ message: "Episode not found" });
    }
    await episode.destroy();
    return res.status(204).send();
  } catch (err) {
    next(err);
  }
};

// Get Episode by ID
const GetEpisodeById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const episode = await Episode.findByPk(id);
    if (!episode) {
      return res.status(404).json({ message: "Episode not found" });
    }
    return res.json(episode);
  } catch (err) {
    next(err);
  }
};


export const seriesController = {
  GetNavController,
  AddSeries,
  UpdateSeries,
  DeleteSeries,
  GetSeriesById,
  AddSeason,
  UpdateSeason,
  DeleteSeason,
  GetSeasonById,
  AddEpisode,
  UpdateEpisode,
  DeleteEpisode,
  GetEpisodeById,
};
