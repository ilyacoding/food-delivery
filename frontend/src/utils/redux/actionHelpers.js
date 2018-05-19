import { createAction, createActions } from "redux-actions";

import FsaErrorDescriptionWrapper from "./FsaErrorDescriptionWrapper";

function wrapErrorPayload(payloadCreator) {
    return function (...args) {
        const payload = payloadCreator(...args);
        return payload instanceof Error
            ? payload
            : new FsaErrorDescriptionWrapper(payload);
    };
}

export function createErrorAction(actionType, payloadCreator = error => error) {
    const actionCreator = createAction(actionType, payloadCreator);
    return function (...args) {
        const payload = wrapErrorPayload(payloadCreator)(...args);
        return actionCreator(payload);
    };
}

export function createErrorActions(errorActionsMap = {}) {
    return createActions(Object.keys(errorActionsMap).reduce((prev, actionKey) => ({
        ...prev,
        [actionKey]: wrapErrorPayload(errorActionsMap[actionKey])
    }), {}));
}