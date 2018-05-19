import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import PaginationStateProvider from "/containers/urlBasedPaging/PaginationStateProvider";
import { DoubleLeftArrow, LeftArrow, RightArrow, DoubleRightArrow, FaSizes } from "/components/icons";

import "./Pagination.scss";

const Pagination = ({ paginationStateProvider }) => {
    return (
        <div className="pagination">
            <span className="pagination__item">
                Всего: {paginationStateProvider.totalItemsCount}
            </span>
            <span className="pagination__item">
                Страница: {paginationStateProvider.currentPage}
            </span>
            <div className="pagination__item">
                {paginationStateProvider.isToFirstActive
                    ?
                    <Link to={paginationStateProvider.routeToFirst}>
                        {DoubleLeftArrow("pagination__control", FaSizes.MIDDLE)}
                    </Link>
                    :
                    DoubleLeftArrow("pagination__control pagination__control--inactive", FaSizes.MIDDLE)
                }
                {paginationStateProvider.isToPrevActive
                    ?
                    <Link to={paginationStateProvider.routeToPrev}>
                        {LeftArrow("pagination__control", FaSizes.SMALL)}
                    </Link>
                    :
                    LeftArrow("pagination__control pagination__control--inactive", FaSizes.SMALL)
                }
                {paginationStateProvider.isToNextActive
                    ?
                    <Link to={paginationStateProvider.routeToNext}>
                        {RightArrow("pagination__control", FaSizes.SMALL)}
                    </Link>
                    :
                    RightArrow("pagination__control pagination__control--inactive", FaSizes.SMALL)
                }
                {paginationStateProvider.isToLastActive
                    ?
                    <Link to={paginationStateProvider.routeToLast}>
                        {DoubleRightArrow("pagination__control", FaSizes.MIDDLE)}
                    </Link>
                    :
                    DoubleRightArrow("pagination__control pagination__control--inactive", FaSizes.MIDDLE)
                }
            </div>
        </div>
    );
};

Pagination.propTypes = {
    paginationStateProvider: PropTypes.instanceOf(PaginationStateProvider).isRequired
};

export default Pagination;