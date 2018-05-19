import { RoleNames } from "/constants";

const hasAdminRole = (roles) => roles.findIndex(role => role === RoleNames.ADMIN) != -1;

export default hasAdminRole;