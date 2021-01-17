import React, { useState } from 'react';
import { Typography } from '@material-ui/core';

import ChartTabs from './ChartTabs';

export default function CompareGraph(props) {

    if (props.shouldDisplayGraph) {
        return(
            <ChartTabs/>
        )
    } else {
        return (
            <Typography align={'center'} color={'info'} variant={'h5'}>
                Please select one or more frameworks and click "compare" to generate data.
            </Typography>
        )
    }
}