import TypedErrorDescription from "./TypedErrorDescription";

class ServiceResult {
    constructor(isSuccess, data, error) {
        this.isSuccess = isSuccess;
        this.data = data;
        this.error = error;
    }
}

export default {
    createSuccess: function (data) {
        if (!data) {
            throw new Error("data is required");
        }

        const serviceResult = new ServiceResult(true, data, null);

        return serviceResult;
    },
    createUnsuccess: function (errorType, errorMessage) {
        if (!errorType) {
            throw new Error("errorType is required");
        }
        if (!errorMessage) {
            throw new Error("errorMessage is required");
        }

        const error = new TypedErrorDescription({ type: errorType, message: errorMessage });
        const serviceResult = new ServiceResult(false, null, error);

        return serviceResult;
    }
};