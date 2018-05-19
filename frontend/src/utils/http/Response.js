export default class Response {
    constructor(ok, statusCode, statusText, data, url) {
        this.ok = ok;
        this.statusCode = statusCode;
        this.statusText = statusText;
        this.data = data;
        this.url = url;
    }
}