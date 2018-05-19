import React from "react";

import ProjectLogo from "./ProjectLogo";
import Description from "./Description";

import "./About.scss";

const About = () => (
    <div className="about">
        <ProjectLogo />
        <Description />
    </div>
);

export default About;