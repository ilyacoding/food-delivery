import React from "react";
import PropTypes from "prop-types";

import tableDataSourceValidator from "./tableDataSourceValidator";
import ColumnHeader from "./ColumnHeader";

import "./Table.scss";

const Table = ({ dataSource, keyGetter }) => {
    return (
        <table className="table">
            <thead>
                <tr className="table__row table__header">
                    {dataSource.header.map((el) =>
                        <th className="table__cell" key={el.key}>
                            {el.displayName}
                        </th>
                    )}
                </tr>
            </thead>
            <tbody>
                {dataSource.items
                    .map((row) =>
                        <tr className="table__row" key={keyGetter(row)}>
                            {dataSource.header.map((item) =>
                                <td className="table__cell" key={item.key}>
                                    {row[item.key]}
                                </td>
                            )}
                        </tr>
                    )}
            </tbody>
        </table>
    );
};

Table.ColumnHeader = ColumnHeader;

Table.propTypes = {
    keyGetter: PropTypes.func.isRequired,
    dataSource: tableDataSourceValidator.isRequired
};

export default Table;