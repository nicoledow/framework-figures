import React, { useState } from 'react';
import { Paper, Tab, Tabs } from '@material-ui/core';

const styles = {
    tabsStyle: {
        selected: {
            color: 'pink'
        },
        unselected: {}
    }
}


export default function ChartTabs(props) {
    const selectedTab = props.selectedTab;
    const selectedTabIdx = props.datapoints.indexOf(selectedTab);
    
    const handleTabClick = (tab) => {
        props.updateSelectedTab(tab);
    }

    return(
        <Paper square className="root">
            <Tabs value={selectedTabIdx} selectionFollowsFocus variant="fullWidth" indicatorColor="secondary" textColor="info">
                {props.datapoints.map(datapoint => {
                    return <Tab label={datapoint} onClick={e => handleTabClick(datapoint)} style={datapoint === props.selectedTab ? styles.tabsStyle.selected : styles.tabsStyle.unselected}/>
                })}
            </Tabs>
        </Paper>
    )
}
