class ValidationResult {
    constructor(isValid, validationErrors) {
        this.isValid = isValid;
        this.validationErrors = validationErrors;
    }
}

export default ValidationResult;