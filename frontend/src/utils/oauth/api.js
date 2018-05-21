import { FOOD_DELIVERY_TOKEN_URL } from "/config";
import { httpFetcher, MimeType } from "/utils/http";

import { XRequestedWithHeader } from "./constants";

export const getAccessToken = (email, password) => {
    const body = {
        email: email,
        password: password
    };

    const json = JSON.stringify(body);

    return httpFetcher.post(FOOD_DELIVERY_TOKEN_URL, json, { "Content-Type": MimeType.JSON, "X-Requested-With": XRequestedWithHeader });
};

export const refreshAccessToken = (refreshToken) => {
    const body = {
        refresh_token: refreshToken
    };

    const json = JSON.stringify(body);

    return httpFetcher.post(FOOD_DELIVERY_TOKEN_URL, json, { "Content-Type": MimeType.JSON, "X-Requested-With": XRequestedWithHeader });
};
