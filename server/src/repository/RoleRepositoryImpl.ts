import { Role, RoleName } from "../models/Role";
import { IRoleRepository } from "./interfaces/IRoleRepository";

export class RoleRepositoryImpl implements IRoleRepository {
   findByName = (name: RoleName) => {
      return Role.findOne({ where: { name: name } });
   };
}
