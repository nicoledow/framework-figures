import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import _ from 'lodash';

import BarGraph from "../Components/BarGraph";

export default function FrameworkComparisonContainer() {

  const frameworksList = ["React", "Angular", "Ember", "Vue"];
  const repoInfo = {
    React: { owner: "facebook", repoName: "react" },
    Angular: { owner: "angular", repoName: "angular.js" },
    Ember: { owner: "emberjs", repoName: "ember.js" },
    Vue: { owner: "vuejs", repoName: "vue" },
  };
  const successMetrics = {
    Issues: "lowest",
    "Pull Requests": "highest",
    Commits: "highest",
  };

  const datapoints = ["Pull Requests", "Commits", "Issues"];
  const [chartData, updateChartData] = useState({});

  //when component mounts, fetch data from GitHub API for each of the 3 datapoints (pull requests, open issues, commits);
  useEffect(() => {
    fetchGitHubData();
  }, []);


  const fetchGitHubData = async () => {
    fetchIssuesData();
    fetchCountedResource("Pull Requests");
    fetchCountedResource("Commits");
  };

  const fetchIssuesData = async () => {
    let issuesData = {};

    function fetchIssuesForFramework(framework) {
      const url = `https://api.github.com/repos/${repoInfo[framework].owner}/${repoInfo[framework].repoName}`;

      return Promise.resolve(
        fetch(url, { headers: { Accept: "application/vnd.github.v3+json" } })
          .then((resp) => resp.json())
          .then((result) => {
            const numOfIssues = result.open_issues_count;
            return numOfIssues;
          })
      );
    }

    issuesData.React = await fetchIssuesForFramework("React");
    issuesData.Angular = await fetchIssuesForFramework("Angular");
    issuesData.Ember = await fetchIssuesForFramework("Ember");
    issuesData.Vue = await fetchIssuesForFramework("Vue");

    
    if (!chartData.Issues || !_.isEqual(chartData.Issues, issuesData)) {
        console.log('issues state should update');
        updateChartData({ ...chartData, Issues: issuesData });
    } 
  };

  const fetchCountedResource = async (key) => {
    let data = {};

    function fetchCountForFramework(framework, key) {
      const resource = key === "Commits" ? "commits" : "pulls";
      const url = `https://api.github.com/repos/${repoInfo[framework].owner}/${repoInfo[framework].repoName}/${resource}?per_page=1`;

      return Promise.resolve(
        fetch(url, { headers: { Accept: "application/vnd.github.v3+json" } })
          .then((resp) => {
            const resourceCount = getNumOfResultsFromPaginationHeader(resp);
            return resourceCount;
          })
          .catch((err) => {
            genericFetchError();
            console.log(`${key} fetch err`, err);
          })
      );
    }

    data.React = await fetchCountForFramework("React", key);
    data.Angular = await fetchCountForFramework("Angular", key);
    data.Ember = await fetchCountForFramework("Ember", key);
    data.Vue = await fetchCountForFramework("Vue", key);

    const newChartData = { ...chartData };
    newChartData[key] = data;

    if (!chartData[key] || !_.isEqual(chartData[key], newChartData[key])) {
        console.log(`should update state for ${key}`);
        updateChartData(newChartData);
    } 
  };

  //parse pagination links and get the 'last' page, revealing the number of that resource if per_page is set to 1
  const getNumOfResultsFromPaginationHeader = (response) => {
    const parse = require("parse-link-header");

    const paginationLinks = parse(response.headers.get("Link"));
    const lastPageURL = paginationLinks.last.url;

    const lastPageNum = parseInt(
      new URLSearchParams(lastPageURL.split("?").pop()).get("page")
    );

    return lastPageNum;
  };

  //generic error for user when there is an issue fetching data from GitHub
  const genericFetchError = () => {
    alert("Sorry, GitHub data could not be fetched at this time.");
  };


  return (
    <Grid container>
        <Grid container item xs={8}>
            <BarGraph chartData={chartData} datapoint={'Issues'} frameworks={frameworksList} successMetrics={successMetrics} refreshData={fetchIssuesData} refreshArg={null}/>
        </Grid>
        <Grid container item xs={8}>
            <BarGraph chartData={chartData} datapoint={'Commits'} frameworks={frameworksList} successMetrics={successMetrics} refreshData={fetchCountedResource} refreshArg={'Commits'}/>
        </Grid>
        <Grid container item xs={8}>
            <BarGraph chartData={chartData} datapoint={'Pull Requests'} frameworks={frameworksList} successMetrics={successMetrics} refreshData={fetchCountedResource} refreshArg={'Pull Requests'}/>
        </Grid>
    </Grid>
  );

}
