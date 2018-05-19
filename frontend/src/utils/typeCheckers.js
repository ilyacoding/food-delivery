export const isFunction = func => typeof func === "function";

export const isString = string => typeof string === "string";

export const isError = error => error instanceof Error;

export const isInteger = number => (number ^ 0) === number;