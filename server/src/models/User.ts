import {
   AutoIncrement,
   BelongsTo,
   Column,
   ForeignKey,
   Model,
   PrimaryKey,
   Table,
   Unique,
} from "sequelize-typescript";
import { Role } from "./Role";

export interface UserAttributes {
   id: number;
   login: string;
   password: string;
   email: string;
   roleId: number;
   role: Role;
}

export interface UserCreationAttributes
   extends Pick<UserAttributes, "login" | "password" | "roleId"> {}

@Table({
   tableName: "users",
})
export class User extends Model<UserAttributes, UserCreationAttributes> {
   @PrimaryKey
   @AutoIncrement
   @Column
   id!: number;

   @Column
   login!: string;

   @Column
   password!: string;

   @Unique
   @Column
   email!: string;

   @ForeignKey(() => Role)
   @Column
   roleId!: number;

   @BelongsTo(() => Role)
   role!: Role;
}
