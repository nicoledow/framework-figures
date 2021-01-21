import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import Chart from "chart.js";

import AdditionalDatapointInfo from './AdditionalDatapointInfo ';

export default function BarGraph(props) {
  const [winningFramework, updateWinningFramework] = useState(null);
  const [losingFramework, updateLosingFramework] = useState(null);

  useEffect(() => {

    let interval = setInterval(() => {
      props.refreshData(props.refreshArg);
    }, 10000);

    return () => clearInterval(interval);
  })

  useEffect(() => {
    const canvas = document.getElementById(`myChart_${props.datapoint}`);
    const data = props.chartData[props.datapoint];

    if (data) {
      const valuesForGraph = Object.values(data);
      const colors = calculateColors();

      const ctx = canvas.getContext("2d");
      const myChart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: props.frameworks,
          datasets: [
            {
              label: `Number of ${props.datapoint}`,
              data: valuesForGraph,
              backgroundColor: colors,
              borderColor: colors,
              hoverBackgroundColor: colors,
              hoverBorderColor: colors,
              borderWidth: 1,
            },
          ],
        },
      });
    }
  }, [props.chartData]);

  const calculateColors = () => {

    const defaultColors = [
      "rgba(232, 232, 232, 1)", 
      "rgba(232, 232, 232, 1)",
      "rgba(232, 232, 232, 1)",
      "rgba(232, 232, 232, 1)"
    ];

    const data = props.chartData[props.datapoint];
    const successMetric = props.successMetrics[props.datapoint];
    const values = Object.values(data);

    const winningFramework = props.getWinningFramework(data, successMetric, values);
    updateWinningFramework(winningFramework);

    const losingFramework = props.getLosingFramework(data, successMetric, values);
    updateLosingFramework(losingFramework);

    const winningFrameworkIdx = props.frameworks.indexOf(winningFramework);
    defaultColors[winningFrameworkIdx] = "rgba(25, 250, 73, 0.5)";

    const losingFrameworkIdx = props.frameworks.indexOf(losingFramework);
    defaultColors[losingFrameworkIdx] = "rgba(255, 5, 9, 0.5)";

    return defaultColors;
  };

 
  return (
    <Grid container direction="row" className="ffGridRow">
      <Grid container item xs={6}>
        <canvas id={`myChart_${props.datapoint}`} />
      </Grid>
      <Grid container item xs={6}>
        <AdditionalDatapointInfo 
          datapoint={props.datapoint} 
          data={props.chartData} 
          winningFramework={winningFramework} 
          losingFramework={losingFramework}
          successMetric={props.successMetrics[props.datapoint]}
          failureMetric={props.successMetrics[props.datapoint] === 'highest' ? 'lowest' : 'highest'}
          />
      </Grid>
    </Grid>
  )
 
}
