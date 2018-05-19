import React from "react";
import PropTypes from "prop-types";

import { FaSizes } from "./faSizeConstants";
import isFaSize from "./faSizesEnumItemValidator";

const faIconsFactory = (iconStyle, iconClassName, iconSize) => {

    const Icon = ({ iconStyle, iconClassName, iconSize }) => (
        <span className={iconClassName}>
            <i className={`fa ${iconStyle} ${iconSize}`} aria-hidden="true"/>
        </span>
    );

    Icon.propTypes = {
        iconClassName: PropTypes.string,
        iconSize: isFaSize,
        iconStyle: PropTypes.string.isRequired
    };

    Icon.defaultProps = {
        iconClassName: null,
        iconSize: FaSizes.MIDDLE
    };

    return <Icon
        iconStyle={iconStyle}
        iconClassName={iconClassName}
        iconSize={iconSize}
    />;
};

export default faIconsFactory;