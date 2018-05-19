import { connect } from "react-redux";

import Sidebar from "/components/Layout/Sidebar";
import { getRoles, getIsAuthenticated } from "/auth/selectors";

const mapStateToProps = state => ({
    isAuthenticated: getIsAuthenticated(state),
    roles: getRoles(state)
});

export default connect(mapStateToProps)(Sidebar);