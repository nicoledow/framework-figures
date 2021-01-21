import React from "react";
import { Grid, Typography } from "@material-ui/core";

export default function AdditionalDatapointInfo(props) {
  return (
    <div class="ffCentered">
      <Typography align="center" class="textColorSecondary" variant="h4">
        {props.datapoint}
      </Typography>
      <ul className="ffList">
        <li>
          <strong>{props.winningFramework}</strong> wins this category because
          it has the {props.successMetric} number of{" "}
          {props.datapoint.toLowerCase()}
        </li>
        <li>
          <strong>{props.losingFramework}</strong> loses this category because
          it has the {props.failureMetric} number of{" "}
          {props.datapoint.toLowerCase()}
        </li>
      </ul>
    </div>
  );
}
