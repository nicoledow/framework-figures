import React, { useState, useEffect } from "react";

export default function Chart(props) {
  // props: { type: 'Pull Requests', frameworks: ['React', 'Angular] }
  const [chartData, updateChartData] = useState(null);
  console.log("chartData", chartData);

  const repoInfo = {
    React: { owner: "facebook", repoName: "react" },
    Angular: { owner: "angular", repoName: "angular.js" },
    Ember: { owner: "emberjs", repoName: "ember.js" },
    Vue: { owner: "vuejs", repoName: "vue" },
  };

  useEffect(async () => {
    const fetchedChartData = await fetchChartData();
    updateChartData(fetchedChartData);
  }, []);

  const fetchChartData = () => {
    const allRepoData = {};

    const githubAPIBaseURL = "https://api.github.com";
    const headers = { Accept: "application/vnd.github.v3+json" };

    props.frameworks.forEach((framework) => {
      const url = `${githubAPIBaseURL}/repos/${repoInfo[framework].owner}/${repoInfo[framework].repoName}`;
      console.log("url", url);

      fetch(url, { headers })
        .then((resp) => resp.json())
        .then((result) => {
          console.log("fetch result", result);

          const repoData = {
            issues: result.open_issues_count,
            pullRequests: [],
            commits: [],
          };

          allRepoData[framework] = repoData;
        })
        .catch((err) => {
          alert('Sorry, repository data could not be fetched.');
          console.log("err", err);
        });
    });
    return allRepoData;
  };

   return <div>Chart</div>
}
