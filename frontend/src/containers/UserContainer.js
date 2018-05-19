import { connect } from "react-redux";

import User from "/components/Layout/User";
import { logoutUser } from "/auth/actions";
import { getDisplayName, getIsAuthenticated } from "/auth/selectors";

const mapStateToProps = state => ({
    displayName: getDisplayName(state),
    isAuthenticated: getIsAuthenticated(state)
});

const mapDispatchToProps = {
    logout: logoutUser
};

export default connect(mapStateToProps, mapDispatchToProps)(User);