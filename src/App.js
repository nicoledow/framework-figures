import { Grid, Container } from "@material-ui/core";

import "./App.css";
import AppHeader from "./Components/AppHeader";
import AppSideNav from "./Components/AppSideNav";
import CompareGraph from "./Components/CompareGraph";

function App() {
  return (
    <Container maxWidth="lg">
      <Grid container direction="row">
        <Grid container item xs={12}>
          <AppHeader />
        </Grid>

        <Grid container item xs={4}>
          <AppSideNav />
        </Grid>

        <Grid containeritem xs={8}>
          <CompareGraph />
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
