import { handleActions } from "/utils/redux";

import { REQUEST_SURVEYS_SUCCESS } from "./actionTypes";
import mapJsonArrayToListOfRecords from "/utils/mapping/mapJsonArrayToListOfRecords";

import SurveyRecord from "./SurveyRecord";

const surveysReducer = handleActions({
    [REQUEST_SURVEYS_SUCCESS]: (state, { payload: { surveys } }) => {
        const surveysList = mapJsonArrayToListOfRecords(surveys, SurveyRecord);
        return surveysList;
    }
}, {});

export default surveysReducer;