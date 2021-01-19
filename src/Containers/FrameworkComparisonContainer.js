import React, { useEffect, useState } from "react";

import BarGraph from "../Components/BarGraph";
import ChartTabs from "../Components/ChartTabs";

export default function FrameworkComparisonContainer() {

  const frameworksList = ["React", "Angular", "Ember", "Vue"];
  const repoInfo = {
    React: { owner: "facebook", repoName: "react" },
    Angular: { owner: "angular", repoName: "angular.js" },
    Ember: { owner: "emberjs", repoName: "ember.js" },
    Vue: { owner: "vuejs", repoName: "vue" },
  };
  const successMetrics = {
      'Issues': 'lowest',
      'Pull Requests': 'highest',
      'Commits': 'highest'
  }

  const datapoints = ["Pull Requests", "Commits", "Issues"];
  const [selectedTab, updateSelectedTab] = useState("Issues");
  const [chartData, updateChartData] = useState({});

  //when component mounts, fetch data from GitHub API for each of the 3 datapoints (pull requests, open issues, commits);
  useEffect(() => {
    fetchGiHubData();
  }, [selectedTab]);

  const fetchGiHubData = async() => {
      console.log('in fetch git hub data', selectedTab);

      switch(selectedTab) {
          case 'Issues':
              console.log('fetch issues data');
              fetchIssuesData();
              break;
           case 'Pull Requests':
               console.log('fetch pull requests');
               fetchCountedResource('Pull Requests');
               break;
            case 'Commits':
                console.log('fetch commits');
                fetchCountedResource('Commits');
                break;
            default:
                break;
      }

  }

  
  const fetchIssuesData = async() => {
      let issuesData = {};

      function fetchIssuesForFramework(framework) {
          const url = `https://api.github.com/repos/${repoInfo[framework].owner}/${repoInfo[framework].repoName}`;

          return Promise.resolve(
              fetch(url, { headers: { Accept: "application/vnd.github.v3+json" } })
              .then(resp => resp.json())
              .then(result => {
                  const numOfIssues = result.open_issues_count;
                  console.log('num of issues', numOfIssues);
                  return numOfIssues;
              })
          )
      }

      issuesData.React = await fetchIssuesForFramework('React');
      issuesData.Angular = await fetchIssuesForFramework('Angular');
      issuesData.Ember = await fetchIssuesForFramework('Ember');
      issuesData.Vue = await fetchIssuesForFramework('Vue');
      console.log('issuesData', issuesData);

      updateChartData({...chartData, 'Issues': issuesData });
  }

  const fetchCountedResource = async(key) => {
    let data = {};

        function fetchCountForFramework(framework, key) {
            const resource = key === 'Commits' ? 'commits' : 'pulls';
            const url = `https://api.github.com/repos/${repoInfo[framework].owner}/${repoInfo[framework].repoName}/${resource}?per_page=1`;

            return Promise.resolve(
                fetch(url, { headers: { Accept: "application/vnd.github.v3+json" } })
                .then((resp) => {
                    const resourceCount = getNumOfResultsFromPaginationHeader(resp);
                    return resourceCount;
                })
                .catch(err => {
                    genericFetchError();
                    console.log(`${key} fetch err`, err);
                })
            );
        }

    data.React = await fetchCountForFramework('React', key);
    data.Angular = await fetchCountForFramework('Angular', key);
    data.Ember = await fetchCountForFramework('Ember', key);
    data.Vue = await fetchCountForFramework('Vue', key);
    
    const state = {...chartData};
    state[key] = data;
    updateChartData(state);
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
    <div className="text-center w-75">
      <ChartTabs
        selectedTab={selectedTab}
        updateSelectedTab={updateSelectedTab}
        datapoints={datapoints}
        frameworks={frameworksList}
      />
      <BarGraph
        selectedTab={selectedTab}
        chartData={chartData}
        frameworks={frameworksList}
        successMetrics={successMetrics}
      />
    </div>
  );
}
