import React from "react";
import PropTypes from "prop-types";

const TabLabel = ({ text, isActive, onSelect}) => (
    <a href="#"
        className={(isActive ? "tabs__tab-item-label tabs_active-item" : "tabs__tab-item-label")}
        onClick={onSelect}
    >
        {text}
    </a>
);

TabLabel.displayName = "TabLabel";

TabLabel.propTypes = {
    text: PropTypes.string.isRequired,
    isActive: PropTypes.bool.isRequired,
    onSelect: PropTypes.func.isRequired
};

export default TabLabel;
