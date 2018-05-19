import { TypedErrorDescription } from "/utils/serviceResult";

export default (params = [], apiCallFunction, { requestEntitiesStart, requestEntitiesError, requestEntitiesSuccess }) =>
    async (dispatch, getState, { fetcherFactory }) => {
        const api = fetcherFactory(dispatch, getState);

        dispatch(requestEntitiesStart(...params));
        try {
            const response = await api(apiCallFunction, params);
            if (response.ok) {
                dispatch(requestEntitiesSuccess(response.data));
                return;
            }

            const errorDescription = new TypedErrorDescription({
                type: response.statusText,
                message: "Нет доступа к данному ресурсу"
            });
            dispatch(requestEntitiesError(errorDescription));
        } catch (error) {
            const errorDescription = new TypedErrorDescription({
                type: error.name,
                message: error.message
            });
            dispatch(requestEntitiesError(errorDescription));
        }
    };