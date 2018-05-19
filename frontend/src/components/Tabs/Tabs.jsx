import React from "react";
import PropTypes from "prop-types";

import TabContent from "./TabContent";
import componentType from "utils/propTypesValidators/componentTypeValidator";
import List from "components/List";
import TabLabel from "./TabLabel";

import "./Tabs.scss";

class Tabs extends React.Component {
    constructor(props) {
        super(props);
        this.state = { selectedItemIndex: this.props.initiallySelectedItemIndex };
    }

    selectTab = (index, event) => {
        event.preventDefault();
        this.setState({
            selectedItemIndex: index
        });
    };

    renderTitles() {
        return (
            <List
                items={this.props.children}
                renderer={(item, index) => (
                    <TabLabel
                        text={item.props.label}
                        isActive={this.state.selectedItemIndex === index}
                        onSelect={this.selectTab.bind(this, index)}
                    />
                )}
                itemKeyFactory={(item) => item.props.label}
                listClassName="tabs__tab-items"
                itemClassName="tabs__tab-item"
            />
        );
    }

    renderContent() {
        const activeTab = this.props.children[this.state.selectedItemIndex];
        return (
            <div>
                {activeTab}
            </div>
        );
    }

    render() {
        return (
            <div className="tabs">
                {this.renderTitles()}
                {this.renderContent()}
            </div>
        );
    }
}

Tabs.propTypes = {
    initiallySelectedItemIndex: PropTypes.number,
    children: PropTypes.arrayOf(componentType(TabContent))
};

Tabs.defaultProps = {
    initiallySelectedItemIndex: 0,
    children: []
};

Tabs.displayName = "Tabs";

export default Tabs;