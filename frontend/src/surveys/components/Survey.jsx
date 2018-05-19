import React from "react";
import PropTypes from "prop-types";

const Survey = ({ id, name, creationDate }) => (
    <div>
        {id} - {name} - {creationDate}
    </div>
);

Survey.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    creationDate: PropTypes.string.isRequired
};

export default Survey;