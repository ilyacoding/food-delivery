import React from "react";
import PropTypes from "prop-types";
import ImmutablePropTypes from "react-immutable-proptypes";

import List from "/components/List";

import Survey from "./Survey";
import SurveyFetcher from "./SurveyFetcher";
import SurveyRecord from "../SurveyRecord";

class Surveys extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = { max: "" };
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.fetchSurveys(this.state.max);
    }

    handleChange(e) {
        this.setState({ max: e.target.value });
    }

    render() {
        return (
            <div>
                <SurveyFetcher
                    onSubmit={this.handleSubmit}
                    onInputChange={this.handleChange}
                />
                <List
                    items={this.props.surveys}
                    renderer={(props) => (
                        <Survey id={props.id} name={props.name} creationDate={props.creationDate} />
                    )}
                    itemKeyFactory={(props) => props.id}
                />
            </div>
        );
    }
}

Surveys.propTypes = {
    fetchSurveys: PropTypes.func.isRequired,
    surveys: ImmutablePropTypes.listOf(SurveyRecord).isRequired
};

export default Surveys;