import httpFetcher from "./httpFetcher";

function appendAuthorizationToken(headers = {}, token) {
    return {
        ...headers,
        "Authorization": `Bearer ${token}`
    };
}

export default (authorizationToken) => {
    if (!authorizationToken) {
        throw new Error("Не указан access token");
    }

    return {
        get: (url, headers = {}) => {
            if (headers["Authorization"]) {
                throw new Error("В заголовках уже указан access token");
            }

            headers = appendAuthorizationToken(headers, authorizationToken);

            return httpFetcher.get(url, headers);
        },
        post: (url, data, headers = {}) => {
            if (headers["Authorization"]) {
                throw new Error("В заголовках уже указан access token");
            }

            headers = appendAuthorizationToken(headers, authorizationToken);

            return httpFetcher.post(url, data, headers);
        }
    };
};