import React, { useEffect } from "react";
import Chart from "chart.js";

export default function BarGraph(props) {
  console.log('bar graph props', props);


  useEffect(() => {
    const canvas = document.getElementById("myChart");
    const data = props.chartData[props.selectedTab]

    if (data) {
      console.log('inside if data');
      const valuesForGraph = Object.values(data);
      
      const ctx = canvas.getContext("2d");
      const myChart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: props.frameworks,
          datasets: [
            {
              label: `Number of ${props.selectedTab}`,
              data: valuesForGraph,
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
  }, [props.selectedTab]);

  return <canvas id="myChart" />;
}
