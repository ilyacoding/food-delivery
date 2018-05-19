import intersection from "lodash.intersection";
import PropTypes from "prop-types";
import ImmutablePropTypes from "react-immutable-proptypes";

import Table from "./Table";

const requiredTableDataSourceValidator = (props, propName, componentName) => {
    const dataSource = props[propName];
    if (!dataSource) {
        return new Error(`${propName} is required in ${componentName}`);
    }

    const dataSourcePropTypes = {
        items: ImmutablePropTypes.list.isRequired,
        header: PropTypes.arrayOf(PropTypes.instanceOf(Table.ColumnHeader)).isRequired
    };
    PropTypes.checkPropTypes(dataSourcePropTypes, dataSource, propName, componentName);

    const { header, items } = dataSource;
    const keysArray = header.map(item => item.key);
    const isKeysMatch = items.every(item => {
        const keys = Object.keys(item);
        const intersect = intersection(keysArray, keys);
        return keysArray.length === intersect.length;
    });
    if (!isKeysMatch) {
        return new Error(`${componentName}: Some of item keys doesn't match with header keys.`);
    }

    return null;
};

const tableDataSourceValidator = (props, propName, componentName) => {
    const dataSource = props[propName];
    if (!dataSource) {
        return null;
    }

    return requiredTableDataSourceValidator(props, propName, componentName);
};

tableDataSourceValidator.isRequired = requiredTableDataSourceValidator;

export default tableDataSourceValidator;