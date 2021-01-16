import { Grid, Container } from "@material-ui/core";

import "./App.css";
import AppHeader from "./Components/AppHeader";
import FrameworkComparisonContainer from './Containers/FrameworkComparisonContainer';

function App() {
  return (
    <Container maxWidth="lg">
      <AppHeader />
      <FrameworkComparisonContainer />
    </Container>
  );
}

export default App;
