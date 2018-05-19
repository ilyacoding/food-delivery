import { ensureIsNotEmpty } from "/utils/stringCheckers";

const ColumnHeader = class {
    constructor(key, displayName) {
        ensureIsNotEmpty(key, "ColumnHeader.key");
        ensureIsNotEmpty(displayName, "ColumnHeader.displayName");
        this.key = key;
        this.displayName = displayName;
    }
};

export default ColumnHeader;