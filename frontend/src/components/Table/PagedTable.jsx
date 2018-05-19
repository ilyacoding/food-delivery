import React from "react";

import Pagination from "/components/Pagination";

import Table from "./Table";

import "./PagedTable.scss";

const PagedTable = ({ keyGetter, dataSource, paginationStateProvider }) => (
    <div className="paged-table">
        <Table
            keyGetter={keyGetter}
            dataSource={dataSource}
        />
        <Pagination
            paginationStateProvider={paginationStateProvider}
        />
    </div>
);

PagedTable.propTypes = {
    // Eslint will be disabled at the next lines, because of inheritance of required propTypes from underlying components
    /* eslint-disable react/require-default-props */
    keyGetter: Table.propTypes.keyGetter,
    dataSource: Table.propTypes.dataSource,
    paginationStateProvider: Pagination.propTypes.paginationStateProvider
    /* eslint-enable react/require-default-props */
};

export default PagedTable;