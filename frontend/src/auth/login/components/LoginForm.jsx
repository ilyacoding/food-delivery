import React from "react";
import PropTypes from "prop-types";
import ImmutablePropTypes from "react-immutable-proptypes";

import { validatePassword, validateEmail } from "/utils/validators/userCredentials";
import ValidatedForm from "/components/ValidatedForm";

const LoginForm = ({ login, loginError }) => (
    <ValidatedForm
        header="Логин"
        submitButtonText="Войти"
        formErrors={[loginError.message]}
        onFormValid={login}
        formFieldsDescription={[
            {
                type: "email",
                name: "email",
                placeholder: "E-mail",
                validator: validateEmail
            },
            {
                type: "password",
                name: "password",
                placeholder: "Пароль",
                validator: validatePassword
            }
        ]}
    />
);

LoginForm.propTypes = {
    login: PropTypes.func.isRequired,
    loginError: ImmutablePropTypes.recordOf({
        type: PropTypes.string.isRequired,
        message: PropTypes.string.isRequired
    }).isRequired
};

export default LoginForm;