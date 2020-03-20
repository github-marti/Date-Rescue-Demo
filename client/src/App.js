import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/Login";
import Home from "./pages/Home";
import EventPage from "./components/EventPage";
import SignUp from "./components/SignUp";
import { StoreProvider } from "./utils/GlobalState";
import LocationView from "./components/LocationView"

function App() {

  return (
    <Router>
      <div>
        <StoreProvider>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/events/:shortid" component={EventPage} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/recommendations" component={LocationView} />
            <Route component={Login} />
          </Switch>
        </StoreProvider>
      </div>
    </Router>
  );
}

export default App;
