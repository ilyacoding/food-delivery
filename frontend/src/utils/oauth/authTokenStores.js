import { localStorageFactory } from "/utils/localStorage";
import jwtDecoder from "/utils/jwtDecoder";

const accessTokenStoreName = "accessToken";
const refreshTokenStoreName = "refreshToken";

export const accessTokenStore = localStorageFactory(accessTokenStoreName);

accessTokenStore.getDecoded = function () {
    const raw = this.get();
    return raw ? jwtDecoder(raw) : null;
};

export const refreshTokenStore = localStorageFactory(refreshTokenStoreName);

export default { accessTokenStore, refreshTokenStore };