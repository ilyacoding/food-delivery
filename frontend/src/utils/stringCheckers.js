import { isString } from "./typeCheckers";

export const ensureIsNotEmpty = (value, parameter = "Parameter") => {
    if (!isString(value)) {
        throw new Error(`${parameter} must be a string.`);
    }
    if ((value === undefined) || (value === null) || (value.trim() === "")) {
        throw new Error(`${parameter} can't be null, undefined or empry string.`);
    }
};