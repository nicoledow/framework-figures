import React, { useState } from "react";

import BarGraph from '../Components/BarGraph';

export default function GraphContainer(props) {
  console.log('bar graph container props', props);

  const chartConfig = {
    type: props.selectedTab,
    frameworks: props.frameworks,
    data: props.chartData[props.selectedTab]
  };

  return (
    <BarGraph chartConfig={chartConfig}/>
  )
}

