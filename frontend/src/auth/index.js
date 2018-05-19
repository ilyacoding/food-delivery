import LoginFormContainer from "./login/containers/LoginFormContainer";
import SignupFormContainer from "./signup/containers/SignupFormContainer";
import redirectAuthenticated from "./redirectAuthenticated";

export const LoginForm = redirectAuthenticated(LoginFormContainer);
export const SignupForm = redirectAuthenticated(SignupFormContainer);