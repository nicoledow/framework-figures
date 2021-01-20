import React from 'react';
import { Button } from "@material-ui/core";

const style = {
    btn: {
        backgroundColor: 'pink',
        color: 'grey'
    }
};

// const data = props.chartData[props.datapoint];
// const successMetric = props.successMetrics[props.datapoint];
// const values = Object.values(data);

// const winningFramework = props.getWinningFramework(data, successMetric, values);

export default function GetFrameworkRecommendationButton(props) {
    console.log('get rec props', props);

    const serializeFrameworkWinners = () => {
        const serializedData = {};

        props.datapoints.forEach(datapoint => {
            const data = props.data[datapoint];
            const values = Object.values(data);
            const successMetric = props.successMetrics[datapoint];

            const winner = props.getWinningFramework(data, successMetric, values);
            serializedData[datapoint] = winner;

            const loser = props.getLosingFramework(data, successMetric, values);
            serializedData[datapoint] = loser;
        })
        console.log('serialized data', serializedData)
    }

    const generateRecommendation = () => {
        const winnersAndLosers = serializeFrameworkWinners(); //{Issues: "React", Commits: "Vue", Pull Requests: "Angular"}
        //create a math fn to calculate the best recommendation based on current data
        //greater numbers of commits and PRs are positive
        //great numbers of issues are negative
        //add tooltips over issues to explain thinking
    }
    return(
        <div class="ffCentered">
            <Button style={style.btn} onClick={generateRecommendation}>Get Recommendation</Button>
        </div>
    )
}