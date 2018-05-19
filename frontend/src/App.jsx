import React from "react";

import Header from "./components/Layout/Header";
import Main from "./components/Layout/Main";
// import Footer from "./components/Layout/Footer";

import "normalize.css/normalize.css";
import "font-awesome/css/font-awesome.css";
import "./App.scss";

const App = () => (
    <div className="page">
        <div className="page__header">
            <Header />
        </div>
        <div className="page__content">
            <Main />
        </div>
        {/* <div className="page__footer">
            <Footer />
        </div> */}
    </div>
);

export default App;
