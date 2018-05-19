import React from "react";
import ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";

import Root from "./Root";

const render = (Component, props = {}) => {
    ReactDOM.render(
        module.hot
            ?
            <AppContainer>
                <Component {...props} />
            </AppContainer>
            :
            <Component {...props} />,
        document.getElementById("root")
    );
};

render(Root);

if (module.hot) {
    module.hot.accept();
}