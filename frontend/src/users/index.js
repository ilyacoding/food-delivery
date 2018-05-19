import roleBasedAuthorize from "/auth/roleBasedAuthorize";
import { RoleNames } from "/constants";

import UsersContainer from "./containers/UsersContainer";

const Users = roleBasedAuthorize(RoleNames.ADMIN)(UsersContainer);

export default Users;