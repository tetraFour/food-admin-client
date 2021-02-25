import React from "react";

import { Switch } from "react-router-dom";

import HomePage from "./Pages/Home";
import FoodPage from "./Pages/Food";
import AddFoodPage from "./Pages/AddFood";
import AuthPage from "./Pages/Auth";
import AddHousePage from "./Pages/AddHouse";
import AllDataPage from "./Pages/AllData";

import PrivateRoute from "./routes/Private";
import PublicRoute from "./routes/Public";
import { BrowserRouter as Router } from "react-router-dom";

const App = () => {
  return (
    <>
      <Router>
        <Switch>
          <PrivateRoute path="/card/:id" exact Component={FoodPage} />
          <PrivateRoute path="/add-new-food" Component={AddFoodPage} />
          <PrivateRoute path="/add-new-house" Component={AddHousePage} />
          <PrivateRoute path="/full-data" Component={AllDataPage} />
          <PrivateRoute path="/home" Component={HomePage} />
          <PublicRoute path="/" exact Component={AuthPage} />
        </Switch>
      </Router>
    </>
  );
};

export default App;
