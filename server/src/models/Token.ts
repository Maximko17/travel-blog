import {
   AutoIncrement,
   BelongsTo,
   Column,
   ForeignKey,
   Model,
   PrimaryKey,
   Table,
} from "sequelize-typescript";
import { User } from "./User";

export interface TokenAttributes {
   id: number;
   token: string;
   iv: string;
   userId: number;
   user: User;
}

export interface TokenCreationAttributes
   extends Omit<TokenAttributes, "id" | "user"> {}

@Table({
   tableName: "tokens",
})
export class Token extends Model<TokenAttributes, TokenCreationAttributes> {
   @PrimaryKey
   @AutoIncrement
   @Column
   id!: number;

   @Column
   token!: string;

   @Column
   iv!: string;

   @ForeignKey(() => User)
   @Column
   userId!: number;

   @BelongsTo(() => User)
   user!: User;
}
