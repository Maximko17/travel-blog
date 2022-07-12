import { Role, RoleName } from "../../models/Role";

export interface IRoleService {
   findByRoleName: (roleName: RoleName) => Promise<Role>;
}
