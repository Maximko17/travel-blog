import { RoleName } from "../models/Role";
import { IRoleRepository } from "../repository/interfaces/IRoleRepository";
import { IRoleService } from "./interfaces/IRoleService";

export class RoleServiceImpl implements IRoleService {
   private readonly _roleRepository: IRoleRepository;

   constructor(roleRepository: IRoleRepository) {
      this._roleRepository = roleRepository;
   }

   findByRoleName = async (roleName: RoleName) => {
      const role = await this._roleRepository.findByName(roleName);
      if (!role) {
         throw new Error(`Роль ${roleName} не найдена`);
      }
      return role;
   };
}
