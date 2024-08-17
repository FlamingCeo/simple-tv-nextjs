import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "@lib/connection/db.connection";
import { Series } from "./series.crm.model";
import { Episode } from "./episode.crm.model";

// Make `id` optional in the attributes interface
interface UserAccessAttributes {
  id: number;
  series_id: number;
  user_id: number;
  season_id: number;
  status: boolean;
}

// Make `id` optional in the creation attributes
interface UserAccessCreationAttributes
  extends Optional<UserAccessAttributes, "id"> {}

class UserAccess
  extends Model<UserAccessAttributes, UserAccessCreationAttributes>
  implements UserAccessAttributes
{
  id!: number;
  series_id!: number;
  user_id!: number;
  season_id!: number;
  status!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

UserAccess.init(
  {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    series_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    season_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    modelName: "UserAccess",
    tableName: "user_access",
    timestamps: true,
    paranoid: true,
    sequelize,
  }
);

// Define associations
UserAccess.hasMany(Series, {
  as: "series",
  foreignKey: "series_id",
});

export { UserAccess, UserAccessAttributes, UserAccessCreationAttributes };
