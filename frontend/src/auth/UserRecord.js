import { Record, List } from "immutable";

const UserRecord = Record({
    id: "",
    email: "",
    displayName: "",
    roles: List()
});

export default UserRecord;