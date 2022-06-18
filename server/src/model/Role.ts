import {
   Model,
   DataTypes,
   InferAttributes,
   InferCreationAttributes,
   Association,
   HasManyGetAssociationsMixin,
} from "sequelize";
import db from "../config/db";
import { User } from "./User";

export class Role extends Model<
   InferAttributes<Role>,
   InferCreationAttributes<Role, { omit: "id" }>
> {
   declare id: number;
   declare role: string;
   declare getUsers: HasManyGetAssociationsMixin<User>;

   declare static associations: {
      User: Association<Role, User>;
   };
}

Role.init(
   {
      id: {
         type: DataTypes.INTEGER,
         autoIncrement: true,
         primaryKey: true,
         allowNull: false,
      },
      role: {
         type: DataTypes.ENUM,
         values: ["USER", "ADMIN"],
      },
   },
   {
      sequelize: db,
      tableName: "roles",
   }
);
