import ServiceResult from "/utils/serviceResult";
import { HttpStatusCode } from "/utils/http";

import { signup } from "./api";

export const SignupErrorType = {
    EMAIL_OCCUPIED: "email_occupied",
    INVALID_INPUT: "invalid_input",
    UNKNOWN_ERROR: "unknown_error"
};

// export const CheckIsEmailOccupiedErrorType = {
//     EMAIL_OCCUPIED: "email_occupied",
//     UNKNOWN_ERROR: "unknown_error"
// };

export default class SignupService {
    signup = async (email, password, birthday, phoneNumber, firstName, lastName, role) => {
        try {
            console.log(`${role} ROLE IN SIGNUP SERVICE EEE BOY`);
            const response = await signup(email, password, birthday, phoneNumber, firstName, lastName, role);

            if (response.ok) {
                return ServiceResult.createSuccess({ email, password, birthday, phoneNumber, firstName, lastName, role });
            }

            if (response.statusCode === HttpStatusCode.CONFLICT) {
                return ServiceResult.createUnsuccess(SignupErrorType.EMAIL_OCCUPIED, "E-mail занят");
            }

            // this.errorTracker.trackUnsuccessfulResponse(response);
            return ServiceResult.createUnsuccess(SignupErrorType.UNKNOWN_ERROR, "Что-то пошло не так. Пожалуйста, попробуйте позже");
        } catch (error) {
            // this.errorTracker.trackError(error);
            return ServiceResult.createUnsuccess(SignupErrorType.UNKNOWN_ERROR, "Что-то пошло не так. Пожалуйста, попробуйте позже");
        }
    }

    // checkIsEmailOccupied = async (email) => {
    //     try {
    //         const response = await getIsEmailOccupied(email);
    //
    //         if (response.ok) {
    //             return response.data.isEmailOccupied
    //                 ? ServiceResult.createSuccess({ email })
    //                 : ServiceResult.createUnsuccess(CheckIsEmailOccupiedErrorType.EMAIL_OCCUPIED, "E-mail занят");
    //         }
    //
    //         this.errorTracker.trackUnsuccessfulResponse(response);
    //         return ServiceResult.createUnsuccess(CheckIsEmailOccupiedErrorType.UNKNOWN_ERROR, "При проверке e-mail что-то пошло не так. Пожалуйста, попробуйте позже");
    //     } catch (error) {
    //         this.errorTracker.trackError(error);
    //         return ServiceResult.createUnsuccess(CheckIsEmailOccupiedErrorType.UNKNOWN_ERROR, "При проверке e-mail что-то пошло не так. Пожалуйста, попробуйте позже");
    //     }
    // }
}
