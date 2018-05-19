import React from "react";
import PropTypes from "prop-types";

import List from "/components/List";
import ValidationError from "/utils/validators/ValidationError";

import "./ErrorList.scss";

const ErrorList = ({ errors }) => (
    <List
        items={errors}
        renderer={error => error.message}
        itemKeyFactory={error => error.type}
        listClassName="error-list"
        itemClassName="error-list__item"
    />
);

ErrorList.defaultProps = {
    errors: []
};

ErrorList.propTypes = {
    errors: PropTypes.arrayOf(PropTypes.instanceOf(ValidationError))
};

export default ErrorList;