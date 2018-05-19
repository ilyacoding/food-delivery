import { createSelector } from "reselect";

const getSurveysFromState = (state) => state.surveys;

export const getSurveys = createSelector(
    getSurveysFromState,
    surveys => surveys
);