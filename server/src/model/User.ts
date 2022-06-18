import {
   Model,
   DataTypes,
   InferAttributes,
   InferCreationAttributes,
   ForeignKey,
   HasOneGetAssociationMixin,
   Association,
} from "sequelize";
import db from "../config/db";
import { Role } from "./Role";

export class User extends Model<
   InferAttributes<User>,
   InferCreationAttributes<User, { omit: "id" }>
> {
   declare id: number;
   declare login: string;
   declare password: string;
   declare email: string;
   declare role_id: ForeignKey<Role["id"]>;
   declare getRole: HasOneGetAssociationMixin<Role>;

   declare static associations: {
      Role: Association<User, Role>;
   };
}

User.init(
   {
      id: {
         type: DataTypes.INTEGER,
         autoIncrement: true,
         primaryKey: true,
         allowNull: false,
      },
      login: {
         type: DataTypes.STRING,
         unique: true,
         allowNull: false,
      },
      password: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      email: {
         type: DataTypes.STRING,
         allowNull: true,
         unique: true,
      },
   },
   {
      sequelize: db,
      tableName: "users",
   }
);
