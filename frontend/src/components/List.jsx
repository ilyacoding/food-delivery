import React from "react";
import PropTypes from "prop-types";
import ImmutablePropTypes from "react-immutable-proptypes";

const List = ({ renderer, items, itemKeyFactory, listClassName, itemClassName }) => (
    <ul className={listClassName}>
        {items.map((item, index) => (
            <li className={itemClassName} key={itemKeyFactory(item)}>{renderer(item, index)}</li>
        ))}
    </ul>
);

List.defaultProps = {
    listClassName: "",
    itemClassName: ""
};

List.propTypes = {
    items: PropTypes.oneOfType([
        PropTypes.array,
        ImmutablePropTypes.list
    ]).isRequired,
    renderer: PropTypes.func.isRequired,
    itemKeyFactory: PropTypes.func.isRequired,
    listClassName: PropTypes.string,
    itemClassName: PropTypes.string
};

export default List;