import React, { useState } from "react";
import Nav from "react-bootstrap/Nav";
import { Button, Typography } from "@material-ui/core";

export default function AppSideNav() {
  const frameworksList = ["React", "Angular", "Ember", "Vue"];
  const [selectedFrameworks, updateFrameworkSelections] = useState([]);

  // remove (deselect) framework if it's already been selected, or add it to list for comparison
  const selectFrameworkForComparison = framework => {
     if (selectedFrameworks.includes(framework)) {
         const frameworkIdx = selectedFrameworks.indexOf(framework);
         selectedFrameworks.splice(frameworkIdx, 1);
         updateFrameworkSelections(selectedFrameworks);
     } else {
        updateFrameworkSelections([...selectedFrameworks, framework]);
     }
  };  

  return (
    <Nav className="flex-column">
      <Typography variant={"h6"} color={"secondary"}>
        Choose frameworks to compare:
      </Typography>
      {frameworksList.map((framework) => {
        return (
          <Nav.Item key={framework} justify={true}>
            <Button onClick={(e) => selectFrameworkForComparison(framework)} 
                style={{backgroundColor: selectedFrameworks.includes(framework) ? 'green' : 'white'}}
            >
              {framework}
            </Button>
          </Nav.Item>
        );
      })}
      <Button>Compare</Button>
    </Nav>
  );
};
