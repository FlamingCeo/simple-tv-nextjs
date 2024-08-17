import { DataTypes, Model } from "sequelize";
import sequelize from "@lib/connection/db.connection";
import { Season } from "./season.crm.model";
interface EpisodeAttributes {
  episode_id: number;
  series_id: number;
  season_id: number;
  no: number;
  name: string;
}

class Episode extends Model<EpisodeAttributes> implements EpisodeAttributes {
  episode_id!: number;
  name!: string;
  series_id!: number;
  season_id!: number;
  no!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

Episode.init(
  {
    episode_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    series_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    season_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    no: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    modelName: "Episode",
    tableName: "episodes",
    timestamps: true,
    paranoid: true,
    sequelize: sequelize,
  }
);
// Episode.belongsTo(Season, { foreignKey: "season_id" });

export { Episode, EpisodeAttributes };
