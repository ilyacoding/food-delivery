import Response from "./Response";

export default class UnsuccessfulFetchError extends Error {
    constructor(response) {
        if (!response) {
            throw new Error("response is required");
        }
        if (!(response instanceof Response)) {
            throw new Error("response must be an instance of Response");
        }

        const { statusCode, statusText, data, url } = response;
        super(JSON.stringify({ statusCode, statusText, data, url }));
        this.name = "UnsuccessfulFetchError";
    }
}