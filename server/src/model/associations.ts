import { Role } from "./Role";
import { User } from "./User";

User.belongsTo(Role, {
   foreignKey: { name: "role_id", allowNull: false },
   as: "Role",
});

Role.hasMany(User, {
   foreignKey: { name: "role_id", allowNull: false },
   as: "Users",
});
