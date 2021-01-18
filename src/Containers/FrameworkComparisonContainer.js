import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";

// import AppSideNav from "../Components/AppSideNav";
import ChartTabs from "../Components/ChartTabs";
import GraphContainer from "./GraphContainer";

export default function FrameworkComparisonContainer() {
  const frameworksList = ["React", "Angular", "Ember", "Vue"];
  const repoInfo = {
    React: { owner: "facebook", repoName: "react" },
    Angular: { owner: "angular", repoName: "angular.js" },
    Ember: { owner: "emberjs", repoName: "ember.js" },
    Vue: { owner: "vuejs", repoName: "vue" },
  };

  const datapoints = ["Pull Requests", "Commits", "Issues"];
  const [selectedTab, updateSelectedTab] = useState("Issues");
  const [chartData, updateChartData] = useState({});

  //when component mounts, fetch data from GitHub API for each of the 3 datapoints (pull requests, open issues, commits);
  useEffect(() => {
    fetchGitHubData();
  }, []);

  //fetch data for each metric
  const fetchGitHubData = () => {
    fetchIssuesData();
  };

  //fetch issues data from GitHub api for each framework and serialize into an object, issuesData, to be added to "chartData" in state
  const fetchIssuesData = () => {
    let issuesData = {};

    let allIssuesRequests = frameworksList.map((framework) => {
      let url = `https://api.github.com/repos/${repoInfo[framework].owner}/${repoInfo[framework].repoName}`;
      return fetch(url, {
        headers: { Accept: "application/vnd.github.v3+json" },
      });
    });

    Promise.all(allIssuesRequests)
      .then((results) => {
        results.forEach((result) => {
          result.json().then((parsedData) => {
            const frameworkName = Object.keys(repoInfo).find(
              (key) => repoInfo[key].repoName === parsedData.name
            );
            issuesData[frameworkName] = parsedData.open_issues_count;
          });
        });
        console.log("issues data", issuesData);
        updateChartData({ ...chartData, Issues: issuesData });
        return;
      })
      .catch((err) => {
        genericFetchError();
        console.log("issues fetch error", err);
      });
  };

  //generic error for user when there is an issue fetching data from GitHub
  const genericFetchError = () => {
    alert("Sorry, GitHub data could not be fetched at this time.");
  };

  return (
    <div className="text-center w-75">
      <ChartTabs
        selectedTab={selectedTab}
        updateSelectedTab={updateSelectedTab}
        datapoints={datapoints}
        frameworks={frameworksList}
      />
      <GraphContainer
        selectedTab={selectedTab}
        chartData={chartData}
        frameworks={frameworksList}
      />
    </div>
  );
}
