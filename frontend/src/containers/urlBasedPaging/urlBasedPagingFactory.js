import { connect } from "react-redux";

import urlBasedPaging from "./urlBasedPaging.jsx";
import { isFunction, isInteger } from "/utils/typeCheckers";

const urlBasedPagingFactory = (wrappedComponent, baseRoute, totalItemsCountSelector, itemsOnPage) => {

    if (!isFunction(totalItemsCountSelector)) {
        return new Error("UrlRouterFactory: totalItemsCountSelector argument must be a function.");
    }

    if (!baseRoute) {
        return new Error("UrlRouterFactory: baseRoute argument is required.");
    }

    if (isNaN(itemsOnPage) || !isInteger(itemsOnPage) || itemsOnPage <= 0) {
        return new Error("UrlRouterFactory: itemsOnPage argument must be a non-zero positive integer.");
    }

    const mapStateToProps = (state) => {
        return {
            totalItemsCount: totalItemsCountSelector(state),
            itemsOnPage: itemsOnPage,
            baseRoute: baseRoute
        };
    };

    return connect(mapStateToProps)(urlBasedPaging(wrappedComponent));
};

export default urlBasedPagingFactory;