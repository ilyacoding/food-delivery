import { Record, List } from "immutable";

const User = Record({
    userName: 0,
    displayName: "",
    roles: List(),
    joinDate: Date(0),
    surveysCount: 0
});

export default User;