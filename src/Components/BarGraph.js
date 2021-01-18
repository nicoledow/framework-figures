import React, { useLayoutEffect } from "react";
import Chart from "chart.js";

export default function BarGraph(props) {

  const chartType = props.chartConfig.type;
  const frameworks = props.chartConfig.frameworks;

  useLayoutEffect(() => {
    const canvas = document.getElementById("myChart");

    if (props.chartConfig && props.chartConfig.data) {
      const data = Object.values(props.chartConfig.data);

      const ctx = canvas.getContext("2d");
      const myChart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: frameworks,
          datasets: [
            {
              label: `Number of ${chartType}`,
              data,
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
              ],
              borderWidth: 1,
            },
          ],
        },
      });
    }
  }, []);

  // return props.chartConfig.data ? <canvas id="myChart" /> : <p>Loading...</p>;
  return <canvas id="myChart"/>
}
