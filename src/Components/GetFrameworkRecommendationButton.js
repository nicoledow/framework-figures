import React from 'react';
import { Button } from "@material-ui/core";

const style = {
    btn: {
        backgroundColor: 'pink',
        color: 'grey'
    }
};

export default function GetFrameworkRecommendationButton(props) {

    const generateRecommendation = () => {
        console.log('generate recommendation');
        //create a math fn to calculate the best recommendation based on current data
        //greater numbers of commits and PRs are positive
        //great numbers of issues are negative
        //add tooltips over issues to explain thinking
    }
    return(
        <div class="ffCentered">
            <Button style={style.btn} onClick={generateRecommendation}>Get Recommendation</Button>
        </div>
    )
}