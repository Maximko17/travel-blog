import { injectable } from "inversify";
import { Role, RoleName } from "../models/Role";
import { IRoleRepository } from "./interfaces/IRoleRepository";

@injectable()
export class RoleRepositoryImpl implements IRoleRepository {
   findByName = (name: RoleName) => {
      return Role.findOne({ where: { name: name } });
   };
}
