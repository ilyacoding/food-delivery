import React from "react";

import "./Footer.scss";

const Footer = () => {
    const year = new Date().getFullYear();
    return (
        <footer className="footer">
            <p>Copyright @ {year} Food-Delivery</p>
        </footer>
    );
};

export default Footer;
