import React, { useState } from 'react';
import { Paper, Tab, Tabs } from '@material-ui/core';

export default function ChartTabs() {
    const datapoints = ['Pull Requests', 'Commits', 'Issues'];
    const [selectedTab, updateSelectedTab] = useState('Pull Requests');
    console.log('chartTabs selected tab', selectedTab);

    const handleChange = () => {
        console.log('handle change');
    };

    return(
        <Paper square className="root">
            <Tabs value={selectedTab} onChange={handleChange} variant="fullWidth" indicatorColor="secondary" textColor="info">
                {datapoints.map(datapoint => {
                    return <Tab label={datapoint}/>
                })}
            </Tabs>
        </Paper>
    )
}