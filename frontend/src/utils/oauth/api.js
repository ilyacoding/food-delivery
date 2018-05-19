import { FOOD_DELIVERY_TOKEN_URL } from "/config";
import { httpFetcher, MimeType } from "/utils/http";

import { XRequestedWithHeader } from "./constants";

// function buildQueryString(object) {
//     return Object.keys(object).map(key => `${key}=${encodeURIComponent(object[key])}`).join("&");
// }

export const getAccessToken = (email, password) => {
    const body = {
        email: email,
        password: password //,
        // grant_type: GrantType.PASSWORD,
        // client_id: CLIENT_ID
    };
    //const queryString = buildQueryString(body);

    const json = JSON.stringify(body);

    return httpFetcher.post(FOOD_DELIVERY_TOKEN_URL, json, { "Content-Type": MimeType.JSON, "X-Requested-With": XRequestedWithHeader });

    //return httpFetcher.post(FOOD_DELIVERY_TOKEN_URL, queryString, { "Content-Type": MimeType.FORM_ENCODED_DATA });
};

export const refreshAccessToken = (refreshToken) => {
    const body = {
        refresh_token: refreshToken//,
        // grant_type: GrantType.REFRESH_TOKEN,
        // client_id: CLIENT_ID
    };
    //const queryString = buildQueryString(body);

    const json = JSON.stringify(body);

    return httpFetcher.post(FOOD_DELIVERY_TOKEN_URL, json, { "Content-Type": MimeType.JSON, "X-Requested-With": XRequestedWithHeader });

    //return httpFetcher.post(FOOD_DELIVERY_TOKEN_URL, queryString, { "Content-Type": MimeType.FORM_ENCODED_DATA });
};