import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Owner from "./pages/Owner";
import Tenant from "./pages/Tenant";
import BuildingForm from "./pages/BuildingForm";
import LeaseForm from "./pages/LeaseForm";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/owner" component={Owner} />
        <Route exact path="/tenant" component={Tenant} />
        <Route exact path="/building_form" component={BuildingForm} />
        <Route exact path="/lease_form" component={LeaseForm} />
      </Switch>
    </Router>
  );
}

export default App;
