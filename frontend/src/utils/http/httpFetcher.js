import Response from "./Response";

export default {
    get: async (url, headers = {}) => {
        const response = await fetch(url, { headers });

        return new Response(
            response.ok,
            response.status,
            response.statusText,
            await response.json(),
            response.url
        );
    },
    post: async (url, data, headers = {}) => {
        const response = await fetch(url, {
            method: "POST",
            headers,
            body: data
        });

        return new Response(
            response.ok,
            response.status,
            response.statusText,
            await response.json(),
            response.url
        );
    }
};
