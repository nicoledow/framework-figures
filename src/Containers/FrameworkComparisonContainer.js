import React, { useState } from "react";
import { Grid } from "@material-ui/core";

import AppSideNav from "../Components/AppSideNav";
import CompareGraph from "../Components/CompareGraph";

export default function FrameworkComparisonContainer() {
  const frameworksList = ["React", "Angular", "Ember", "Vue"];
  const [selectedFrameworks, updateFrameworkSelections] = useState([]);
  const [shouldDisplayGraph, updateShouldDisplayGraph] = useState(false);

  // remove (deselect) framework if it's already been selected, or add it to list for comparison
  let newFrameworkSelections;
  const selectFrameworkForComparison = (framework) => {
    if (selectedFrameworks.includes(framework)) {
      newFrameworkSelections = selectedFrameworks.filter(ele => ele !== framework);
    } else {
      newFrameworkSelections = [...selectedFrameworks, framework];
    }
    updateFrameworkSelections(newFrameworkSelections);
  };

  return (
    <Grid container direction="row" justify="center" alignItems="center">
      <Grid container item xs={4}>
        <AppSideNav frameworksList={frameworksList} 
            selectedFrameworks={selectedFrameworks} 
            updateShouldDisplayGraph={updateShouldDisplayGraph}/>
      </Grid>

      <Grid container item xs={8}>
        <CompareGraph selectedFrameworks={selectedFrameworks} shouldDisplayGraph={shouldDisplayGraph}/>
      </Grid>
    </Grid>
  );
}
