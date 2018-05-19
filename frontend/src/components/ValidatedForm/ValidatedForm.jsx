import React, { Component } from "react";
import PropTypes from "prop-types";

import ValidationResult from "/utils/validators/ValidationResult";
import ValidatedInput from "./ValidatedInput";

import "./ValidatedForm.scss";

function injectAdditionalFields(validator, additionalValues = []) {
    return value => validator(value, ...additionalValues);
}

class ValidatedForm extends Component {
    constructor(props) {
        super(props);

        this.state = this.props.formFieldsDescription.reduce((prev, fieldDescription) => ({
            ...prev,
            [fieldDescription.name]: "",
            validationResults: {
                ...prev.validationResults,
                [fieldDescription.name]: new ValidationResult(true, [])
            }
        }), { validationResults: {} });
    }

    validateState = () => {
        const validationResults = this.props.formFieldsDescription.reduce((prev, fieldDescription) => {
            const fieldName = fieldDescription.name;
            const fieldValue = this.state[fieldName];

            const additionalFieldsForValidation = fieldDescription.additionalFieldsForValidation;
            const additionalFields = additionalFieldsForValidation ? additionalFieldsForValidation : [];
            const additionalValues = additionalFields.map(fieldName => this.state[fieldName]);

            return {
                ...prev,
                [fieldName]: fieldDescription.validator(fieldValue, ...additionalValues)
            };
        }, {});

        return validationResults;
    }

    onFormValid = (e) => {
        e.preventDefault();

        this.setState({ validationResults: this.validateState() }, () => {
            if (Object.values(this.state.validationResults).some(x => !x.isValid)) {
                return;
            }

            const params = this.props.formFieldsDescription.reduce((prev, fieldDescription) => ({
                ...prev,
                [fieldDescription.name]: this.state[fieldDescription.name]
            }), {});
            this.props.onFormValid(params);
        });
    }

    render() {
        return (
            <form className="validated-form" onSubmit={this.onFormValid}>
                <div className="validated-form__header">
                    {this.props.header}
                </div>
                {
                    this.props.formErrors.map(formError => (
                        <div className="validated-form__group" key={formError}>
                            <div className="validated-form__error">{formError}</div>
                        </div>
                    ))
                }
                {this.props.formFieldsDescription.map(input => {
                    const { type, name, placeholder, validator, onInputLostFocus, additionalFieldsForValidation } = input;
                    const additionalFields = additionalFieldsForValidation ? additionalFieldsForValidation : [];
                    const additionalValues = additionalFields.map(fieldName => this.state[fieldName]);

                    return (
                        <ValidatedInput key={name}
                            defaultState={{
                                value: this.state[name],
                                validationResult: this.state.validationResults[name]
                            }}
                            validator={injectAdditionalFields(validator, additionalValues)}
                            className="validated-form__group"
                            type={type}
                            name={name}
                            placeholder={placeholder}
                            onValidated={(e) => {
                                this.setState({
                                    ...this.state,
                                    [name]: e.value,
                                    validationResults: {
                                        ...this.state.validationResults,
                                        [name]: e.validationResult
                                    }
                                });
                            }}
                            onInputLostFocus={onInputLostFocus}
                        />
                    );
                })}
                <div className="validated-form__group">
                    <button type="submit">{this.props.submitButtonText}</button>
                </div>
            </form>
        );
    }
}

ValidatedForm.defaultProps = {
    header: "",
    formErrors: [],
    onSubmit: () => { }
};

ValidatedForm.propTypes = {
    formFieldsDescription: PropTypes.arrayOf(PropTypes.shape({
        type: PropTypes.oneOf(["password", "text", "email", "number"]).isRequired,
        name: PropTypes.string.isRequired,
        placeholder: PropTypes.string,
        validator: PropTypes.func.isRequired,
        onInputLostFocus: PropTypes.func,
        additionalFieldsForValidation: PropTypes.arrayOf(PropTypes.string)
    })).isRequired,
    header: PropTypes.string,
    submitButtonText: PropTypes.string.isRequired,
    formErrors: PropTypes.arrayOf(PropTypes.string),
    onSubmit: PropTypes.func,
    onFormValid: PropTypes.func.isRequired
};

export default ValidatedForm;