import React, { Component } from "react";
import PropTypes from "prop-types";

import ValidationResult from "/utils/validators/ValidationResult";

import ErrorList from "./ErrorList";

export default class ValidatedInput extends Component {
    constructor(props) {
        super(props);
        this.state = props.defaultState;
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.defaultState) {
            this.setState(nextProps.defaultState);
        }
    }

    updateValue = e => {
        const value = e.target.value;
        this.setState({
            value: value
        }, () => this.validate(value));
    }

    validate = value => {
        const validationErrors = this.props.validator(value);
        this.setState({
            validationResult: validationErrors
        }, () => this.props.onValidated({
            value: this.state.value,
            validationResult: this.state.validationResult
        }));
    }

    validateInput = e => {
        const value = e.target.value;
        this.validate(value);
    }

    render() {
        const { className, type, name, placeholder, onInputLostFocus } = this.props;
        return (
            <div className={className}>
                <input
                    value={this.state.value}
                    type={type}
                    name={name}
                    placeholder={placeholder}
                    onChange={this.updateValue}
                    onKeyUp={this.validateInput}
                    onBlur={e => {
                        if (this.state.validationResult.isValid) {
                            onInputLostFocus(e.target.value);
                        }
                    }}
                />
                <ErrorList
                    errors={this.state.validationResult.validationErrors}
                />
            </div>
        );
    }
}

ValidatedInput.defaultProps = {
    defaultState: {
        value: "",
        validationResult: new ValidationResult(true, [])
    },
    className: "",
    placeholder: "",
    onInputLostFocus: () => { },
    onValidated: () => { }
};

ValidatedInput.propTypes = {
    defaultState: PropTypes.shape({
        value: PropTypes.string.isRequired,
        validationResult: PropTypes.instanceOf(ValidationResult).isRequired
    }),
    validator: PropTypes.func.isRequired,
    className: PropTypes.string,
    type: PropTypes.oneOf(["password", "text", "email", "number"]).isRequired,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    onInputLostFocus: PropTypes.func,
    onValidated: PropTypes.func
};