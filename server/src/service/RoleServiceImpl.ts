import { inject, injectable } from "inversify";
import DI_TYPES from "../config/DIContainerTypes";
import { RoleName } from "../models/Role";
import { IRoleRepository } from "../repository/interfaces/IRoleRepository";
import { IRoleService } from "./interfaces/IRoleService";

@injectable()
export class RoleServiceImpl implements IRoleService {
   @inject(DI_TYPES.IRoleRepository)
   private readonly _roleRepository!: IRoleRepository;

   findByRoleName = async (roleName: RoleName) => {
      const role = await this._roleRepository.findByName(roleName);
      if (!role) {
         throw new Error(`Роль ${roleName} не найдена`);
      }
      return role;
   };
}
