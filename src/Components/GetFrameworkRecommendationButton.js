import React, { useState } from "react";

export default function GetFrameworkRecommendationButton(props) {
  
  //determine whether a recommendation is available (based on whether data has loaded)
    //determine whether recommendation should show, based on whether the button has been clicked or not
  const [recommendation, setRecommendation] = useState(null);
  const [shouldDisplayRecommendation, updateShouldDisplayRecommendation,] = useState(false);


  // look at the values for each metric we are measuring with, and organize into an object
    // returns an object such  as: {Issues: "React", Commits: "Vue", Pull Requests: "Angular"}
  const serializeFrameworkWinners = () => {
    const serializedData = {};

    props.datapoints.forEach((datapoint) => {
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

  // tally points for each framework by whether they "win" or "lose" in any of the 3 metrics
  const generateRecommendation = () => {
    const winnersAndLosers = serializeFrameworkWinners(); 

    const points = {};
    props.frameworks.forEach((framework) => {
      points[framework] = 0;
    });

    props.datapoints.forEach((datapoint) => {
      const winningFramework = winnersAndLosers[datapoint];
      if (winningFramework) {
        points[winningFramework] += 1;
      }
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
            In addition to this, a lower number of issues contributed to {recommendation}'s score.
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
