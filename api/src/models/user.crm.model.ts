import { DataTypes, Model } from 'sequelize';
import sequelize from '@lib/connection/db.connection';
;
interface UserAttributes {
	user_id: number;
	email: string;
	password: string;
	
}

class User extends Model<UserAttributes> implements UserAttributes {
	user_id!: number;
	email!: string;
	password!: string;
	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
	public readonly deletedAt!: Date;
}

User.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    modelName: "User",
    tableName: "users",
    timestamps: true,
    paranoid: true,
    sequelize: sequelize,
  }
);



export { User, UserAttributes };
