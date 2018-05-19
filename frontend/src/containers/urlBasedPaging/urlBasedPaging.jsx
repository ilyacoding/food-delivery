import React from "react";
import PropTypes from "prop-types";

import { isInteger } from "/utils/typeCheckers";

import PaginationStateProvider from "./PaginationStateProvider";

const INITIAL_PAGE = 1;

function urlBasedPaging(WrappedComponent) {

    return class extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                page: INITIAL_PAGE,
                lastPage: INITIAL_PAGE
            };
        }

        componentWillMount = () => {
            const urlPage = +this.props.match.params.page;
            if (this.parsePageFromPathOrDefault(urlPage)) {
                this.setState({ page: urlPage });
            }
            else {
                this.setState({ page: INITIAL_PAGE });
                this.redirect(INITIAL_PAGE);
            }
        }

        parsePageFromPathOrDefault = (page) => {
            const numericPage = +page;
            if (isNaN(parseFloat(numericPage))
                || !isFinite(numericPage)
                || !isInteger(numericPage)
                || numericPage <= 0) {
                return null;
            }

            return numericPage;
        }

        componentWillReceiveProps = (nextProps) => {
            const urlPage = +this.props.match.params.page;
            const nextUrlPage = +nextProps.match.params.page;

            if (nextUrlPage !== urlPage && this.parsePageFromPathOrDefault(nextUrlPage)) {
                this.setState({ page: nextUrlPage });
            }
            const lastPage = Math.ceil(nextProps.totalItemsCount / this.props.itemsOnPage);
            if (this.state.lastPage === INITIAL_PAGE && lastPage > INITIAL_PAGE) {
                this.setState({ lastPage: lastPage });
            }
        }

        redirect = (page) => {
            this.props.history.push(`${this.props.baseRoute}/${page}`);
        }

        onGoToPage = (page) => {
            if (this.parsePageFromPathOrDefault(page)) {
                this.redirect(page);
            }
        }

        render() {
            const paginationStateProvider = new PaginationStateProvider(
                this.props.baseRoute,
                this.state.page,
                this.state.lastPage,
                this.props.totalItemsCount
            );
            return (
                <WrappedComponent
                    goToPage={this.onGoToPage}
                    page={this.state.page}
                    {...this.props}
                    paginationStateProvider={paginationStateProvider}
                />
            );
        }

        static propTypes = {
            match: PropTypes.shape({
                params: PropTypes.shape({
                    page: PropTypes.string.isRequired
                }).isRequired
            }).isRequired,
            history: PropTypes.shape({
                push: PropTypes.func.isRequired
            }).isRequired,
            totalItemsCount: PropTypes.number.isRequired,
            itemsOnPage: PropTypes.number.isRequired,
            baseRoute: PropTypes.string.isRequired
        }
    };
}

export default urlBasedPaging;