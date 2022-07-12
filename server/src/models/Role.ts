import {
   AutoIncrement,
   Column,
   DataType,
   HasMany,
   Model,
   PrimaryKey,
   Table,
} from "sequelize-typescript";
import { User } from "./User";

export enum RoleName {
   ADMIN = "ADMIN",
   USER = "USER",
}

export interface RoleAttributes {
   id: number;
   name: RoleName;
   users: User[];
}

export interface RoleCreationAttributes extends Pick<RoleAttributes, "name"> {}

@Table({
   tableName: "roles",
})
export class Role extends Model<RoleAttributes, RoleCreationAttributes> {
   @PrimaryKey
   @AutoIncrement
   @Column
   id!: number;

   @Column({
      type: DataType.ENUM,
      values: Object.values(RoleName),
   })
   name!: string;

   @HasMany(() => User)
   users!: User[];
}
