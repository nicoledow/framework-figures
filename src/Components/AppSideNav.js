import React from "react";
import Nav from "react-bootstrap/Nav";
import { Button, Typography } from "@material-ui/core";

export default function AppSideNav(props) {

  return (
    <Nav className="flex-column">
      <Typography variant={"h6"} color={"secondary"}>
        Choose frameworks to compare:
      </Typography>
      {props.frameworksList.map((framework) => {
        return (
          <Nav.Item key={framework} justify={true}>
            <Button onClick={e => props.selectFrameworkForComparison(framework)}>
                {framework}
            </Button>
          </Nav.Item>
        );
      })}
      <Button>Compare</Button>
    </Nav>
  );
};
