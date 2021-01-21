import React from "react";

export default function AdditionalDatapointInfo(props) {
  return (
    <div class="ffCentered">
      <h3 className="colorPrimary">
        {props.datapoint}
      </h3>
      <ul className="ffList">
        <li>
          <strong className="colorSecondary">{props.winningFramework}</strong> wins this category because
          it has the {props.successMetric} number of{" "}
          {props.datapoint.toLowerCase()}
        </li>
        <li>
          <strong className="colorSecondary">{props.losingFramework}</strong> loses this category because
          it has the {props.failureMetric} number of{" "}
          {props.datapoint.toLowerCase()}
        </li>
      </ul>
    </div>
  );
}
