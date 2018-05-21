import { connect } from "react-redux";

import SignupForm from "../components/SignupForm";
import { signupUser } from "../actions";
import { getSignupError } from "../../selectors";

const mapStateToProps = state => ({
    signupError: getSignupError(state)
});

const mapDispatchToProps = {
    signup: signupUser
};

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);
