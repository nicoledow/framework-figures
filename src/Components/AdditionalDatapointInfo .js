import React from "react";
import { Grid, Typography } from "@material-ui/core";

export default function AdditionalDatapointInfo(props) {
    console.log('additional info props', props);

    return(
        <Grid container direction="row" className="gridRight">
            <Grid container item xs={12}>
                <Typography align="center" color="secondary" variant="h4">{props.datapoint}</Typography>
            </Grid>
            <Grid container item xs={6}>
                <ul className="ffList">
                    <li><strong>{props.winningFramework}</strong> wins this category because it has the {props.successMetric} number of {props.datapoint.toLowerCase()}</li>
                    <li><strong>{props.losingFramework}</strong> loses this category because it has the {props.failureMetric} number of {props.datapoint.toLowerCase()}</li>
                </ul>
            </Grid>
            <Grid container item xs={6}>
                lorem ipsum
            </Grid>
        </Grid>
    )
}