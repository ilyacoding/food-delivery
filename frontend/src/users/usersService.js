import ServiceResult from "/utils/serviceResult";
import { HttpStatusCode } from "/utils/http";

import { isInteger } from "/utils/typeCheckers";

import { getUsers } from "./api";

export const FetchUsersErrorType = {
    NON_POSITIVE_INTEGER_SKIP: "non_positive_integer_skip",
    NON_POSITIVE_INTEGER_TOP: "non_positive_integer_top",
    UNKNOWN_ERROR: "unknown_error"
};

export default class UsersService {
    constructor(errorTracker, fetch) {
        this.errorTracker = errorTracker;
        this.fetch = fetch;
    }

    fetchUsers = async (skip, top) => {
        if (isNaN(skip) || !isInteger(skip) || skip < 0) {
            return ServiceResult.createUnsuccess(FetchUsersErrorType.NON_POSITIVE_INTEGER_SKIP, "Параметр skip должен быть неотрицательным целым числом.");
        }
        if (isNaN(top) || !isInteger(top) || top < 0) {
            return ServiceResult.createUnsuccess(FetchUsersErrorType.NON_POSITIVE_INTEGER_TOP, "Параметр top должен быть неотрицательным целым числом.");
        }
        try {
            const response = await this.fetch(getUsers, [skip, top]);

            if (response.ok) {
                return ServiceResult.createSuccess(response.data);
            }

            if (response.statusCode === HttpStatusCode.BAD_REQUEST) {
                return ServiceResult.createUnsuccess(FetchUsersErrorType.UNKNOWN_ERROR, "Произошла ошибка при обработке входных данных");
            }

            this.errorTracker.trackUnsuccessfulResponse(response);
            return ServiceResult.createUnsuccess(FetchUsersErrorType.UNKNOWN_ERROR, "Что-то пошло не так. Пожалуйста, попробуйте позже");
        } catch (error) {
            this.errorTracker.trackError(error);
            return ServiceResult.createUnsuccess(FetchUsersErrorType.UNKNOWN_ERROR, "Что-то пошло не так. Пожалуйста, попробуйте позже");
        }
    }
}