import validator from "validator";

import ValidationError from "./ValidationError";
import ValidationResult from "./ValidationResult";

const FIRST_NAME_MIN_LENGTH = 2;
const LAST_NAME_MIN_LENGTH = 2;
const PHONE_MIN_LENGTH = 9;
const PASSWORD_MIN_LENGTH = 6;

const UserRoleName = "user";
const SupplierRoleName = "supplier";

const ErrorType = {
    REQUIRED: "required",
    PASSWORD_MATCH: "password_match",
    EMAIL_FORMAT: "email_format",
    EMAIL_OCCUPIED: "email_occupied",
    FIRST_NAME_MIN_LENGTH: "first_name_min_length",
    LAST_NAME_MIN_LENGTH: "last_name_min_length",
    PASSWORD_MIN_LENGTH: "password_min_length",
    BIRTHDAY_DATE_FORMAT: "birthday_date_format",
    PHONE_MIN_LENGTH: "phone_min_length",
    INCORRECT_ROLE: "incorrect_role"
};

export const validateFirstName = name => {
    const errors = [];
    if (validator.isEmpty(name)) {
        const error = new ValidationError(ErrorType.REQUIRED, "Имя необходимо для заполнения");
        errors.push(error);
    }
    if (name.length < FIRST_NAME_MIN_LENGTH) {
        const error = new ValidationError(ErrorType.FIRST_NAME_MIN_LENGTH, `Имя должно состоять как минимум из ${FIRST_NAME_MIN_LENGTH} символов`);
        errors.push(error);
    }

    const isValid = errors.length === 0;
    return new ValidationResult(isValid, errors);
};

export const validateLastName = name => {
    const errors = [];
    if (validator.isEmpty(name)) {
        const error = new ValidationError(ErrorType.REQUIRED, "Фамилия необходима для заполнения");
        errors.push(error);
    }
    if (name.length < LAST_NAME_MIN_LENGTH) {
        const error = new ValidationError(ErrorType.LAST_NAME_MIN_LENGTH, `Фамилия должна состоять как минимум из ${LAST_NAME_MIN_LENGTH} символов`);
        errors.push(error);
    }

    const isValid = errors.length === 0;
    return new ValidationResult(isValid, errors);
};

export const validatePhone = phoneNumber => {
    const errors = [];
    if (validator.isEmpty(phoneNumber)) {
        const error = new ValidationError(ErrorType.REQUIRED, "Телефон необходим для заполнения");
        errors.push(error);
    }
    if (phoneNumber.length < PHONE_MIN_LENGTH) {
        const error = new ValidationError(ErrorType.PHONE_MIN_LENGTH, `Телефон должен состоять как минимум из ${PHONE_MIN_LENGTH} символов`);
        errors.push(error);
    }

    if (isNaN(parseInt(phoneNumber)) || !isFinite(phoneNumber)) {
        const error = new ValidationError(ErrorType.PHONE_MIN_LENGTH, "Телефон должен состоять из цифр");
        errors.push(error);
    }

    const isValid = errors.length === 0;
    return new ValidationResult(isValid, errors);
};

export const validateBirthday = birthday => {
    const errors = [];
    if (validator.isEmpty(birthday)) {
        const error = new ValidationError(ErrorType.REQUIRED, "День рождения должен быть заполнен");
        errors.push(error);
    }

    var regex = new RegExp("[0-9]{4}-(0[1-9]|1[012])-(0[1-9]|1[0-9]|2[0-9]|3[01])");
    var dateOk = regex.test(birthday);
    if (!dateOk || birthday.length > 10) {
        const error = new ValidationError(ErrorType.BIRTHDAY_DATE_FORMAT, "День рождения введён неверно");
        errors.push(error);
    }

    const isValid = errors.length === 0;
    return new ValidationResult(isValid, errors);
};

export const validateEmail = email => {
    const errors = [];
    if (validator.isEmpty(email)) {
        const error = new ValidationError(ErrorType.REQUIRED, "E-mail необходим для заполнения");
        errors.push(error);
    }
    if (!validator.isEmail(email)) {
        const error = new ValidationError(ErrorType.EMAIL_FORMAT, "Неверный формат e-mail");
        errors.push(error);
    }

    const isValid = errors.length === 0;
    return new ValidationResult(isValid, errors);
};

export const validateRole = role => {
    const errors = [];
    if (validator.isEmpty(role)) {
        const error = new ValidationError(ErrorType.REQUIRED, "Роль необходима для заполнения");
        errors.push(error);
    }
    if (role.toLowerCase() != UserRoleName && role.toLowerCase() != SupplierRoleName) {
        const error = new ValidationError(ErrorType.INCORRECT_ROLE, "Неверная роль");
        errors.push(error);
    }

    const isValid = errors.length === 0;
    return new ValidationResult(isValid, errors);
};

export const validatePassword = password => {
    const errors = [];
    if (validator.isEmpty(password)) {
        const error = new ValidationError(ErrorType.REQUIRED, "Пароль необходим для заполнения");
        errors.push(error);
    }
    if (password.length < PASSWORD_MIN_LENGTH) {
        const error = new ValidationError(ErrorType.PASSWORD_MIN_LENGTH, `Пароль должен состоять как минимум из ${PASSWORD_MIN_LENGTH} символов`);
        errors.push(error);
    }

    const isValid = errors.length === 0;
    return new ValidationResult(isValid, errors);
};

export const validatePasswordConfirmation = (password, passwordConfirmation) => {
    const errors = [];
    if (!validator.equals(password, passwordConfirmation)) {
        const error = new ValidationError(ErrorType.PASSWORD_MATCH, "Пароли должны совпадать");
        errors.push(error);
    }

    const isValid = errors.length === 0;
    return new ValidationResult(isValid, errors);
};
