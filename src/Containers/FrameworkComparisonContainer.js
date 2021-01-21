import React, { useEffect, useState } from "react";
import { Container, Grid } from "@material-ui/core";
import _ from 'lodash';

import GetFrameworkRecommendationButton from '../Components/GetFrameworkRecommendationButton';
import BarGraph from "../Components/BarGraph";

export default function FrameworkComparisonContainer() {

  const frameworksList = ["React", "Angular", "Ember", "Vue"];
  const datapoints = ["Issues", "Commits", "Pull Requests"];

  const repoInfo = {
    React: { owner: "facebook", repoName: "react" },
    Angular: { owner: "angular", repoName: "angular.js" },
    Ember: { owner: "emberjs", repoName: "ember.js" },
    Vue: { owner: "vuejs", repoName: "vue" },
  };

  // how we will determine which framework wins in each category
  const successMetrics = {
    Issues: "lowest",
    "Pull Requests": "highest",
    Commits: "highest",
  };

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

  // fetch issues data, add the number of issues for each repo to an object and update the chartData state
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
          .catch(err => {
              genericFetchError();
              console.log('fetch issues err', err);
          })
      );
    }

    issuesData.React = await fetchIssuesForFramework("React");
    issuesData.Angular = await fetchIssuesForFramework("Angular");
    issuesData.Ember = await fetchIssuesForFramework("Ember");
    issuesData.Vue = await fetchIssuesForFramework("Vue");

    
    if (!chartData.Issues || !_.isEqual(chartData.Issues, issuesData)) {
        updateChartData({ ...chartData, Issues: issuesData });
    } 
  };

  // fetch the pull requests or commits resources
    // request 1 result per page and use the link for the last page (found in headers) to determine the number of that resource
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

  // use the winner criteria (highest or lowest number) to determine which framework wins per each metric
  const getWinningFramework = (data, successMetric, values) => {
    let winnerValue;

    if (successMetric === "lowest") {
      winnerValue = Math.min(...values);
    } else {
      winnerValue = Math.max(...values);
    }

    return findKeyFromValue(winnerValue, data);
  };

  // use the loser criteria (highest or lowest number) to determine which framework losees per each metric
  const getLosingFramework = (data, successMetric, values) => {
    let loserValue;

    if (successMetric === 'lowest') {
      loserValue = Math.max(...values);
    } else {
      loserValue = Math.min(...values);
    }

    return findKeyFromValue(loserValue, data);
  };

  // use the value to find the object key, and thus the framework name
  const findKeyFromValue = (value, obj) => {
    return Object.entries(obj).find(pair => pair[1] === value)[0] || false;
  };


  return (
    <Container>
        <GetFrameworkRecommendationButton data={chartData} frameworks={frameworksList} datapoints={datapoints} successMetrics={successMetrics} getWinningFramework={getWinningFramework} getLosingFramework={getLosingFramework}/>
        <BarGraph chartData={chartData} datapoint={'Issues'} frameworks={frameworksList} successMetrics={successMetrics} refreshData={fetchIssuesData} refreshArg={null} getWinningFramework={getWinningFramework} getLosingFramework={getLosingFramework}/>
        <BarGraph chartData={chartData} datapoint={'Commits'} frameworks={frameworksList} successMetrics={successMetrics} refreshData={fetchCountedResource} refreshArg={'Commits'} getWinningFramework={getWinningFramework} getLosingFramework={getLosingFramework}/>
        <BarGraph chartData={chartData} datapoint={'Pull Requests'} frameworks={frameworksList} successMetrics={successMetrics} refreshData={fetchCountedResource} refreshArg={'Pull Requests'} getWinningFramework={getWinningFramework} getLosingFramework={getLosingFramework}/>
    </Container>
  );

}
