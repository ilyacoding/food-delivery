import React from "react";
import PropTypes from "prop-types";

const SurveyFetcher = ({ onInputChange, onSubmit }) => (
    <form onSubmit={onSubmit}>
        <input
            type="number"
            placeholder="Max"
            onChange={onInputChange} />
        <button type="submit">Fetch</button>
    </form>
);

SurveyFetcher.propTypes = {
    onInputChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
};

export default SurveyFetcher;