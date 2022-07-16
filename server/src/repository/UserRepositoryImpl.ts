import { injectable } from "inversify";
import { User } from "../models/User";
import { IUserRepository } from "./interfaces/IUserRepository";

@injectable()
export class UserRepositoryImpl implements IUserRepository {
   findById = (id: number) => {
      return User.findOne({ where: { id: id } });
   };

   findAll = () => {
      return User.findAll();
   };

   findByLogin = (login: string) => {
      return User.findOne({ where: { login: login } });
   };

   save = (user: User) => {
      return user.save();
   };
}
