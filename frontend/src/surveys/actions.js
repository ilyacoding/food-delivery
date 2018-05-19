import { createActions } from "/utils/redux";
import fetchEntities from "/utils/fetchEntities";

import { REQUEST_SURVEYS_START, REQUEST_SURVEYS_SUCCESS, REQUEST_SURVEYS_ERROR } from "./actionTypes";
import { getSurveys } from "./api";

export const { requestSurveysStart, requestSurveysSuccess, requestSurveysError } = createActions({
    [REQUEST_SURVEYS_START]: max => ({ max }),
    [REQUEST_SURVEYS_SUCCESS]: surveys => ({ surveys }),
    [REQUEST_SURVEYS_ERROR]: error => (error)
});

export const fetchSurveys = (max) => fetchEntities([max], getSurveys, {
    requestEntitiesStart: requestSurveysStart,
    requestEntitiesError: requestSurveysError,
    requestEntitiesSuccess: requestSurveysSuccess
});