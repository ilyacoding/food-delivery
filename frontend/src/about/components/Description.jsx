import React from "react";

import Tabs from "components/Tabs/Tabs";
import TabContent from "components/Tabs/TabContent";
import LocationOnMap from "./LocationOnMap";
import CompanyDescription from "./CompanyDescription";
import CompanyAddress from "./CompanyAddress";
import itechartStudents from "./itechartStudents.jpg";
import "./Description.scss";

const Description = () => (
    <Tabs initiallySelectedItemIndex={0}>
        <TabContent label="О нас">
            <LocationOnMap />
            <div className="description__text">
                <CompanyDescription /><br />
                <strong>Наш адрес:</strong><CompanyAddress />
            </div>
        </TabContent>
        <TabContent label="Обучение">
            <img className="description__itechart-sudents-image" src={itechartStudents}></img>
            <div className="description__text">Приходите к нам на курсы у нас круто тут</div>
        </TabContent>
        <TabContent label="Бенефиты">
            <div className="description__text">This is my benefits tab contents!</div>
        </TabContent>
        <TabContent label="Для студентов">
            <div className="description__text">This is my for-students tab contents!</div>
        </TabContent>
        <TabContent label="Наши преимущества">
            <div className="description__text">This is my advantages tab contents!</div>
        </TabContent>
        <TabContent label="Вакансии">
            <div className="description__text">This is my vacancies tab contents!</div>
        </TabContent>
        <TabContent label="Контакты">
            <div className="description__text">This is my contacts tab contents!</div>
        </TabContent>
    </Tabs>
);

export default Description;