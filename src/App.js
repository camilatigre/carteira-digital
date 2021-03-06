import React from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/home/Home";
import Unauthorized from "./pages/Unauthorized";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { GlobalProvider } from "./common/context/GlobalState";
import "./styles/Main.css";

const App = () => {
  return (
    <GlobalProvider>
      <Router>
        <Switch>
          <Route path="/" component={Login} exact />
          <Route path="/register" component={Register} exact />
          <Route path="/home" component={Home} exact />
          <Route path="/401" component={Unauthorized} exact />
        </Switch>
      </Router>
    </GlobalProvider>
  );
};

export default App;
