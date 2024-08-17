import { DataTypes, Model } from "sequelize";
import sequelize from "@lib/connection/db.connection";
import { Series } from "./series.crm.model";
import { Episode } from "./episode.crm.model";
interface SeasonAttributes {
  season_id: number;
  series_id: number;
  no: number;
  name: string;
}

class Season extends Model<SeasonAttributes> implements SeasonAttributes {
  season_id!: number;
  name!: string;
  series_id!: number;
  no!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

Season.init(
  {
    season_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    series_id: {
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
    modelName: "Season",
    tableName: "seasons",
    timestamps: true,
    paranoid: true,
    sequelize: sequelize,
  }
);
// Season.belongsTo(Series, { foreignKey: "series_id" });
Season.hasMany(Episode, { as: "episodes", foreignKey: "season_id" });
export { Season, SeasonAttributes };
