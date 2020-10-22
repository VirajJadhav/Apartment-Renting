import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Owner from "./pages/Owner";
import Tenant from "./pages/Tenant";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/owner" component={Owner} />
        <Route exact path="/tenant" component={Tenant} />
      </Switch>
    </Router>
  );
}

export default App;
