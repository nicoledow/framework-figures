# About "Framework Figures"

Framework figures is a React application, bootstrapped by `create-react-app`, that compares data regarding the number of commits, issues, and pull requests in the official repositories of four popular client-side JavaScript frameworks: `React`, `Angular`, `Ember`, and `Vue`.

 The application pulls in data from these four repositories every 30 seconds, and updates any corresponding components if necessary. To keep the user experience smoother, if no changes to the data have occurred since the last sync the user will see no change. This is a single page application (SPA), so there will be no page refreshes.

## How to Run Framework Figures Locally
You will need `npm` installed before beginning.

Clone the repo, CD into the directory, and run the following commands:

`npm install`

`npm start`

# About the Code

## Why the Metrics Were Chosen

From the various data options I could have used to determine activity, community support, and stability, I chose to evaluate the number of commits, pull requests, and issues. 

- Commits indicate actual interaction with the repository, and is, in my opinion, a better indicator than watchers or stars. In this application, a higher number earns a framework more favorability points.

- Pull requests indicate continual improvements and bug fixes to the code, which is a positive indicator for development activity and community support and earns a framework favorability points.

- A high number of issues could indicate problematic code, and decrease a framework's ranking in Framework Figures.

### Considerations Regarding the Metrics

There are two sides to every coin! Further analysis and comparison of more than these 3 datapoints could reveal that a high number of issues actually indicates good stability, if associated pull requests to solve a raised issue follow swiftly. Similarly, one could ask if a high number of pull requests is correlated to a high number of issues that need to be fixed. More statistical comparison could reveal interesting findings about what is _truly_ the most reliable JavaScript framework.


## Code/Component Organization
The powerhouse of this application is the `FrameworkComparisonContainer` component. This component holds any logic that either fetches data for or may be used by any child components, such as data fetched from the GitHub API. I created this large container component and used it to house data-heavy functions so that these functions could be defined in just one place and reused in several components under its umbrella. 

For example, both the `BarGraph` and `GetFrameworkRecommendation` needed the `getWinningFramework` function, so it made sense to define this function in one parent container where it could be passed to both children. Additionally, this parent component manages the `chartData` state so that it is consistent across both the `BarGraph` and `GetFrameworkRecommendation` components. Writing this code, I really aimed to keep it DRY.

The `FrameworkComparisonContainer` makes use of the useEffect hook, triggering the function `fetchGitHubData()` after the component renders, then a piece of state called `chartData` is updated with the results.

### Automatic Updates to Data
The charts will pull new data from the GitHub API regarding issues, commits, and PRs every thirty seconds, so the data is always current. Each chart component (`BarGraph`) creates an interval after rendering its initial data, also through the use of the `useEffect` hook. Every thirty seconds, `fetchGitHubData` will rerun. 

However, the functions called by this function contains a check (shown below) to ensure state is only updated and the component is only re-rendered if the chart is going to actually change because new data has been received. If the new statistics are the same as before, no re-render should happen.

An example:
```
 if (!chartData[key] || !_.isEqual(chartData[key], newChartData[key])) {
        updateChartData(newChartData);
    } 
```