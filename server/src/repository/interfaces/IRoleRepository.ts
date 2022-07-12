import { Role, RoleName } from "../../models/Role";

export interface IRoleRepository {
   findByName: (name: RoleName) => Promise<Role | null>;
}
