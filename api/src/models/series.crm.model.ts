import { DataTypes, Model } from "sequelize";
import sequelize from "@lib/connection/db.connection";
import { Season } from "./season.crm.model";

interface SeriesAttributes {
  series_id: number;
  name: string;
}

class Series extends Model<SeriesAttributes> implements SeriesAttributes {
  series_id!: number;
  name!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

Series.init(
  {
    series_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
    },

  },
  {
    modelName: "Series",
    tableName: "series",
    timestamps: true,
    paranoid: true,
    sequelize: sequelize,
  }
);
Series.hasMany(Season, {
  as: "seasons",
  foreignKey: "series_id",
});

export { Series, SeriesAttributes };
