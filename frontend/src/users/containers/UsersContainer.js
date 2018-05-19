import { connect } from "react-redux";

import urlBasedPagingFactory from "/containers/urlBasedPaging/urlBasedPagingFactory.js";
import { USERS_ROUTE } from "/constants";

import { fetchUsers } from "../actions";
import UsersPagedTable from "../components/UsersPagedTable";
import { getUsers, getTotalUsersCount, getIsLoading } from "../selectors.js";
import { USERS_ON_PAGE } from "../constants";

const mapStateToProps = (state) => {
    return {
        users: getUsers(state),
        totalUsersCount: getTotalUsersCount(state),
        isLoading: getIsLoading(state),
        usersOnPage: USERS_ON_PAGE
    };
};

const mapDispatchToProps = {
    fetchUsers
};

const usersPagedTableWithUrlRouter = urlBasedPagingFactory(UsersPagedTable, `${USERS_ROUTE}`, getTotalUsersCount, USERS_ON_PAGE);

export default connect(mapStateToProps, mapDispatchToProps)(usersPagedTableWithUrlRouter);