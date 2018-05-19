import React from "react";
import PropTypes from "prop-types";

import "/assets/stylesheets/utility.scss";

class TabContent extends React.Component {
    render() {
        return (
            <div className="tabs__tab-content">
                {this.props.children}
            </div>
        );
    }
}

TabContent.displayName = "TabContent";

TabContent.propTypes = {
    label: PropTypes.string.isRequired,
    children: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.array
    ]).isRequired
};

export default TabContent;