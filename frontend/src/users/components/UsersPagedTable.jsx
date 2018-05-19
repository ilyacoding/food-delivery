import React from "react";
import PropTypes from "prop-types";
import ImmutablePropTypes from "react-immutable-proptypes";

import { RoleNames } from "/constants";
import hasAdminRole from "/utils/authorization/hasAdminRole";
import { Table, PagedTable } from "/components/Table";
import Spinner from "/components/Spinner/Spinner";

import UserRecord from "../UserRecord";

class UsersPagedTable extends React.Component {

    loadUsers = (page, usersOnPage) => {
        this.props.fetchUsers((page - 1) * usersOnPage, usersOnPage);
    }

    componentDidMount = () => {
        this.loadUsers(this.props.page, this.props.usersOnPage);
    }

    componentWillReceiveProps = (nextProps) => {
        if (nextProps.page !== this.props.page) {
            this.loadUsers(nextProps.page, this.props.usersOnPage);
        }
        if (this.props.totalUsersCount === 0
            && this.props.users.size === 0
            && nextProps.totalUsersCount > 0
            && nextProps.users.size === 0) {
            const lastPage = Math.ceil(nextProps.totalUsersCount / this.props.usersOnPage);
            nextProps.goToPage(lastPage);
        }
    }

    mapUsersForTable = (sourceUsersList) => {
        const mappedUsersList = sourceUsersList.map((user) => {
            const role = hasAdminRole(user.roles.map(r => r.name)) ? (RoleNames.ADMIN) : (RoleNames.USER);
            return {
                ...user.toObject(),
                role
            };
        });
        return mappedUsersList;
    }

    render() {
        const usersList = this.mapUsersForTable(this.props.users);
        const columnHeaders = [
            new Table.ColumnHeader("displayName", "Имя"),
            new Table.ColumnHeader("role", "Роль"),
            new Table.ColumnHeader("joinDate", "Зарегестрирован"),
            new Table.ColumnHeader("surveysCount", "Опросы")];
        return (
            <div>
                <header>
                    <h2>Пользователи</h2>
                </header>
                {this.props.isLoading
                    ? (<Spinner />)
                    : (
                        <PagedTable
                            dataSource={{
                                items: usersList,
                                header: columnHeaders
                            }}
                            keyGetter={user => user.userName}
                            paginationStateProvider={this.props.paginationStateProvider}
                        />
                    )}
            </div>
        );
    }
}

UsersPagedTable.propTypes = {
    fetchUsers: PropTypes.func.isRequired,
    goToPage: PropTypes.func.isRequired,
    users: ImmutablePropTypes.listOf(UserRecord).isRequired,
    totalUsersCount: PropTypes.number.isRequired,
    isLoading: PropTypes.bool.isRequired,
    page: PropTypes.number.isRequired,
    usersOnPage: PropTypes.number.isRequired,
    paginationStateProvider: PropTypes.object.isRequired
};

export default UsersPagedTable;