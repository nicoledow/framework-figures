import React, { useState } from "react";
import { Modal } from "@material-ui/core";

export default function GetFrameworkRecommendationButton(props) {
  console.log("rec button props", props);
  const [recommendation, setRecommendation] = useState(null);
  const [
    shouldDisplayRecommendation,
    updateShouldDisplayRecommendation,
  ] = useState(false);

  console.log("get rec props", props);
  const issueWeights = {
    Issues: 1,
    Commits: 1,
    "Pull Requests": 1.25,
  };

  const serializeFrameworkWinners = () => {
    const serializedData = {};

    props.datapoints.forEach((datapoint) => {
      serializedData[datapoint] = {};
      const data = props.data[datapoint];
      if (data) {
        const values = Object.values(data);
        const successMetric = props.successMetrics[datapoint];

        const winner = props.getWinningFramework(data, successMetric, values);
        serializedData[datapoint] = winner;
      }
    });
    console.log("serialized data", serializedData);
    return serializedData;
  };

  const generateRecommendation = () => {
    const winnersAndLosers = serializeFrameworkWinners(); //{Issues: "React", Commits: "Vue", Pull Requests: "Angular"}

    const points = {};
    props.frameworks.forEach((framework) => {
      points[framework] = 0;
    });

    props.datapoints.forEach((datapoint) => {
      const winningFramework = winnersAndLosers[datapoint];
      points[winningFramework] += issueWeights[datapoint];
    });

    const winner = Object.keys(points).reduce((a, b) =>
      points[a] > points[b] ? a : b
    );

    setRecommendation(winner);
    console.log("recommendation", winner);
    updateShouldDisplayRecommendation(true);
  };

  if (recommendation && shouldDisplayRecommendation) {
    return (
      <div class="ffCentered">
        <div>
          <h2 className="colorSecondary">We recommend {recommendation}!</h2>
          <p>
            We have recommended {recommendation} based on the repository's
            number of commits, number of pull requests, and number of issues.
          </p>
          <p>
            Higher numbers of commits and pull requests boosted {recommendation}
            's score, as they indicate more people improving the code.
          </p>
          <p>
            In addition to this, a lower number of contributed to
            {recommendation}'s score.
          </p>
        </div>
        <button onClick={e => updateShouldDisplayRecommendation(false)} className="ffButton">Done</button>
      </div>
    );
  } else {
    return (
      <div class="ffCentered">
        <button onClick={generateRecommendation} className="ffButton">
          {" "}
          Get Recommendation
        </button>
      </div>
    );
  }
}
