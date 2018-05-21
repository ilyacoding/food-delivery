import ServiceResult from "/utils/serviceResult";
import { HttpStatusCode } from "/utils/http";

import { signup } from "./api";

export const SignupErrorType = {
    EMAIL_OCCUPIED: "email_occupied",
    INVALID_INPUT: "invalid_input",
    UNKNOWN_ERROR: "unknown_error"
};

export default class SignupService {
    signup = async (email, password, birthday, phoneNumber, firstName, lastName, role) => {
        try {
            const response = await signup(email, password, birthday, phoneNumber, firstName, lastName, role);

            if (response.ok) {
                return ServiceResult.createSuccess({ email, password, birthday, phoneNumber, firstName, lastName, role });
            }

            if (response.statusCode === HttpStatusCode.CONFLICT) {
                return ServiceResult.createUnsuccess(SignupErrorType.EMAIL_OCCUPIED, "E-mail занят");
            }

            return ServiceResult.createUnsuccess(SignupErrorType.UNKNOWN_ERROR, "Что-то пошло не так. Пожалуйста, попробуйте позже");
        } catch (error) {
            return ServiceResult.createUnsuccess(SignupErrorType.UNKNOWN_ERROR, "Что-то пошло не так. Пожалуйста, попробуйте позже");
        }
    }
}
