import Raven from "raven-js";

import { isString, isError } from "/utils/typeCheckers";

const sentryErrorTracker = {
    setup: (config) => {
        if (!config) {
            throw new Error("config is required");
        }

        const { TRACKER_URL, APP_VERSION, ENVIRONMENT_NAME } = config;
        if (!TRACKER_URL) {
            throw new Error("TRACKER_URL is required");
        }
        if (!APP_VERSION) {
            throw new Error("APP_VERSION is required");
        }
        if (!ENVIRONMENT_NAME) {
            throw new Error("ENVIRONMENT_NAME is required");
        }

        Raven
            .config(TRACKER_URL, {
                appVersion: APP_VERSION,
                environment: ENVIRONMENT_NAME
            })
            .install();
    },
    trackMessage: (message, { email }) => {
        if (!message) {
            throw new Error("message is required");
        }
        if (!isString(message)) {
            throw new TypeError("message must be a string");
        }

        email ? Raven.setUserContext({ email }) : Raven.setUserContext();
        Raven.captureMessage(message);
    },
    trackError: (error, { email }) => {
        if (!error) {
            throw new Error("error is required");
        }
        if (!isError(error)) {
            throw new TypeError("error must be an instance of Error");
        }

        email ? Raven.setUserContext({ email }) : Raven.setUserContext();
        Raven.captureException(error);
    }
};

export default sentryErrorTracker;