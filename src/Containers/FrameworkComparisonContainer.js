import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";

// import AppSideNav from "../Components/AppSideNav";
import ChartTabs from '../Components/ChartTabs';
import BarGraphContainer from "./BarGraphContainer";

export default function FrameworkComparisonContainer() {
  const frameworksList = ["React", "Angular", "Ember", "Vue"];
  const repoInfo = {
    React: { owner: "facebook", repoName: "react" },
    Angular: { owner: "angular", repoName: "angular.js" },
    Ember: { owner: "emberjs", repoName: "ember.js" },
    Vue: { owner: "vuejs", repoName: "vue" },
  };

  const datapoints = ["Pull Requests", "Commits", "Issues"];
  const [selectedTab, updateSelectedTab] = useState("Pull Requests");
  const [chartData, updateChartData] = useState(null);
  console.log("chartData", chartData);



  //fetch data from GitHub API for each of the 3 datapoints (pull requests, open issues, commits);
    //pass this data to the BarGraph component


  return (
      <div className="text-center w-75">
          <ChartTabs selectedTab={selectedTab} updateSelectedTab={updateSelectedTab} datapoints={datapoints} frameworks={frameworksList}/>
            <BarGraphContainer selectedTab={selectedTab}/>
      </div>
 
  );
}
