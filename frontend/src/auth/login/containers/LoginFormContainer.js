import { connect } from "react-redux";

import { loginUser } from "../actions";
import LoginForm from "../components/LoginForm";
import { getLoginError } from "../../selectors";

const mapStateToProps = state => ({
    loginError: getLoginError(state)
});

const mapDispatchToProps = {
    login: loginUser
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);