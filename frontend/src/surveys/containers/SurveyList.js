import { connect } from "react-redux";

import roleBasedAuthorize from "/auth/roleBasedAuthorize";
import { RoleNames } from "/constants";

import { fetchSurveys } from "../actions";
import Surveys from "../components/Surveys";
import { getSurveys } from "../selectors";

const mapStateToProps = (state) => {
    return {
        surveys: getSurveys(state)
    };
};

const mapDispatchToProps = {
    fetchSurveys
};

export default roleBasedAuthorize(RoleNames.ADMIN)(connect(mapStateToProps, mapDispatchToProps)(Surveys));