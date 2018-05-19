import ServiceResult from "/utils/serviceResult";
import { HttpStatusCode } from "/utils/http";

import { refreshAccessToken } from "./api";
import { accessTokenStore, refreshTokenStore } from "./authTokenStores";
// import { AuthErrorCode } from "./constants";
import { getAccessToken } from "./api";

export const RefreshAccessTokenErrorType = {
    EMPTY_REFRESH_TOKEN: "EMPTY_REFRESH_TOKEN",
    INVALID_REFRESH_TOKEN: "INVALID_REFRESH_TOKEN",
    UNKNOWN_ERROR: "UNKNOWN_ERROR"
};

export const GetAccessTokenErrorType = {
    INVALID_CREDENTIALS: "INVALID_CREDENTIALS",
    UNKNOWN_ERROR: "UNKNOWN_ERROR"
};

export default class OAuthService {
    // constructor(errorTracker) {
    //     this.errorTracker = errorTracker;
    // }

    refreshAccessToken = async () => {
        try {
            const refreshToken = refreshTokenStore.get();
            if (!refreshToken) {
                return ServiceResult.createUnsuccess(RefreshAccessTokenErrorType.EMPTY_REFRESH_TOKEN, "Отсутвует refresh token");
            }

            const response = await refreshAccessToken(refreshToken);

            if (response.ok) {
                const accessToken = response.data.token;
                accessTokenStore.set(accessToken);
                // const newRefreshToken = response.data.refreshToken;
                // refreshTokenStore.set(newRefreshToken);

                return ServiceResult.createSuccess({ accessToken });
            }

            if (response.statusCode === HttpStatusCode.UNAUTHORIZED) {
                return ServiceResult.createUnsuccess(RefreshAccessTokenErrorType.INVALID_REFRESH_TOKEN, "Недействительный refresh token");
            }

            // this.errorTracker.trackUnsuccessfulResponse(response);
            return ServiceResult.createUnsuccess(RefreshAccessTokenErrorType.UNKNOWN_ERROR, "Произошла неизвестная ошибка при обновлении access token");
        } catch (error) {
            // this.errorTracker.trackError(error);
            return ServiceResult.createUnsuccess(RefreshAccessTokenErrorType.UNKNOWN_ERROR, "Произошла неизвестная ошибка при обновлении access token");
        }
    }

    getAccessToken = async (email, password) => {
        try {
            const response = await getAccessToken(email, password);

            if (response.ok) {
                const accessToken = response.data.token;
                accessTokenStore.set(accessToken);
                const refreshToken = response.data.refreshToken;
                refreshTokenStore.set(refreshToken);

                return ServiceResult.createSuccess({ accessToken });
            }

            if (response.statusCode === HttpStatusCode.UNAUTHORIZED) {
                return ServiceResult.createUnsuccess(GetAccessTokenErrorType.INVALID_CREDENTIALS, "Неверный логин или пароль");
            }

            // this.errorTracker.trackUnsuccessfulResponse(response);
            return ServiceResult.createUnsuccess(GetAccessTokenErrorType.UNKNOWN_ERROR, "Что-то пошло не так. Пожалуйста, попробуйте позже");
        } catch (error) {
            // this.errorTracker.trackError(error);
            return ServiceResult.createUnsuccess(GetAccessTokenErrorType.UNKNOWN_ERROR, "Что-то пошло не так. Пожалуйста, попробуйте позже");
        }
    }

    logout = () => {
        accessTokenStore.remove();
        refreshTokenStore.remove();
    }
}
