import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "@lib/connection/db.connection";
import { Series } from "./series.crm.model";
import { Episode } from "./episode.crm.model";
import { Season } from "./season.crm.model";
import { User } from "./user.crm.model";

interface PaymentAttributes {
  id: number;
  series_id: number;
  user_id: number;
  season_id: number;
  payment_date: Date;
  amount: number;
  grant_status: boolean;
}


class Payment extends Model<PaymentAttributes> implements PaymentAttributes {
  id!: number;
  series_id!: number;
  user_id!: number;
  season_id!: number;
  payment_date!: Date;
  amount!: number;
  grant_status!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

Payment.init(
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
    payment_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    grant_status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    modelName: "Payment",
    tableName: "payments",
    timestamps: true,
    paranoid: true,
    sequelize,
  }
);

// Associations
Payment.hasMany(Series, {
  as: "series",
  foreignKey: "series_id",
});
Payment.hasMany(Season, {
  as: "season",
  foreignKey: "season_id",
});
Payment.hasMany(User, {
  as: "user",
  foreignKey: "user_id",
});




export { Payment, PaymentAttributes };
