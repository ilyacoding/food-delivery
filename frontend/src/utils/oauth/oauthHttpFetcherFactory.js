import { authenticatedHttpFetcher, HttpStatusCode } from "/utils/http";
import { accessTokenStore } from "/utils/oauth/authTokenStores";

import OAuthService, { RefreshAccessTokenErrorType } from "./oAuthService";

export default (logoutUser) => (dispatch) => async (apiCallFunction, params) => {

    const accessToken = accessTokenStore.get();

    const response = await apiCallFunction(authenticatedHttpFetcher(accessToken))(...params);

    if (response.statusCode !== HttpStatusCode.UNAUTHORIZED) {
        return response;
    }

    const service = new OAuthService();
    const result = await service.refreshAccessToken();
    if (!result.isSuccess) {
        if (result.error.type === RefreshAccessTokenErrorType.INVALID_REFRESH_TOKEN) {
            dispatch(logoutUser());
        }

        return response;
    }

    const newResponse = await apiCallFunction(authenticatedHttpFetcher(result.data.accessToken))(...params);
    return newResponse;
};
