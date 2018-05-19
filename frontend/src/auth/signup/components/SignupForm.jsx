import React from "react";
import PropTypes from "prop-types";
import ImmutablePropTypes from "react-immutable-proptypes";

import { validatePhone, validateRole, validateBirthday, validateLastName, validateFirstName, validateEmail, validatePassword, validatePasswordConfirmation } from "/utils/validators/userCredentials";
import ValidatedForm from "/components/ValidatedForm";

const SignupForm = ({ signup, signupError }) => (
    <ValidatedForm
        header="Регистрация"
        submitButtonText="Регистрация"
        formErrors={[signupError.message]}
        onFormValid={signup}
        formFieldsDescription={[
            {
                type: "text",
                name: "firstName",
                placeholder: "Имя",
                validator: validateFirstName
            },
            {
                type: "text",
                name: "lastName",
                placeholder: "Фамилия",
                validator: validateLastName
            },
            {
                type: "email",
                name: "email",
                placeholder: "E-mail",
                validator: validateEmail
            },
            {
                type: "text",
                name: "role",
                placeholder: "Введите роль (user/supplier)",
                validator: validateRole
            },
            {
                type: "text",
                name: "phoneNumber",
                placeholder: "Phone",
                validator: validatePhone
            },
            {
                type: "text",
                name: "birthday",
                placeholder: "Birthday date yyyy-mm-dd",
                validator: validateBirthday
            },
            {
                type: "password",
                name: "password",
                placeholder: "Пароль",
                validator: validatePassword
            },
            {
                type: "password",
                name: "passwordConfirmation",
                placeholder: "Подтверждение пароля",
                validator: validatePasswordConfirmation,
                additionalFieldsForValidation: ["password"]
            }
        ]}
    />
);

SignupForm.propTypes = {
    signup: PropTypes.func.isRequired,
    signupError: ImmutablePropTypes.recordOf({
        type: PropTypes.string.isRequired,
        message: PropTypes.string.isRequired
    }).isRequired
};

export default SignupForm;
