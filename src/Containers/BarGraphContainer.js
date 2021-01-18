import React, { useState } from "react";

import IssuesBarGraph from '../Components/IssuesBarGraph';

export default function BarGraphContainer(props) {
  
  switch(props.selectedTab) {
    case 'Issues':
      return <IssuesBarGraph data={props.chartData}/>
    default:
      return(
        <div>Chart {props.selectedTab}</div>
      )
  }
}

