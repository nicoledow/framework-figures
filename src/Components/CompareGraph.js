import React, { useState } from "react";
import { Container, Typography } from "@material-ui/core";

import ChartTabs from "./ChartTabs";
import Chart from './Chart';

export default function CompareGraph(props) {
  const datapoints = ["Pull Requests", "Commits", "Issues"];
  const [selectedTab, updateSelectedTab] = useState("Pull Requests");

  if (props.shouldDisplayGraph) {
    return (
      <Container>
        <ChartTabs
          selectedTab={selectedTab}
          updateSelectedTab={updateSelectedTab}
          datapoints={datapoints}
        />
        <Chart type={selectedTab} frameworks={props.selectedFrameworks} />
      </Container>
    );
  } else {
    return (
      <Container>
        <ChartTabs
          selectedTab={selectedTab}
          updateSelectedTab={updateSelectedTab}
          datapoints={datapoints}
        />
        <Typography align={"center"} color={"info"} variant={"h5"}>
          Please select one or more frameworks and click "compare" to generate
          data.
        </Typography>
      </Container>
    );
  }
}
