import { User, UserCreationAttributes } from "../../models/User";

export interface IUserRepository {
   findAll: () => Promise<User[]>;

   findById: (id: number) => Promise<User | null>;

   findByLogin: (login: string) => Promise<User | null>;

   save: (user: User) => Promise<User>;

   create: (
      userAttrs: UserCreationAttributes,
      options?: object
   ) => Promise<User>;
}
