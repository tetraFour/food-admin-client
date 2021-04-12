import React, { useEffect } from "react";

import { BrowserRouter as Router } from "react-router-dom";
import { Switch } from "react-router-dom";

import PrivateRoute from "./routes/Private";
import PublicRoute from "./routes/Public";

import HomePage from "./Pages/Home";
import FoodPage from "./Pages/Food";
import AddFoodPage from "./Pages/AddFood";
import AuthPage from "./Pages/Auth";
import AddHousePage from "./Pages/AddHouse";
import AllDataPage from "./Pages/AllData";
import TestPage from "./Pages/Test";

const App = () => {
  return (
    <>
      <Router>
        <Switch>
          <PrivateRoute path="/food/:id" exact Component={FoodPage} />
          <PrivateRoute path="/add-new-food" Component={AddFoodPage} />
          <PrivateRoute path="/add-new-house" Component={AddHousePage} />
          <PrivateRoute path="/full-data" Component={AllDataPage} />
          <PrivateRoute path="/test" Component={TestPage} />
          <PrivateRoute path="/home" Component={HomePage} />
          <PublicRoute path="/" exact Component={AuthPage} />
        </Switch>
      </Router>
    </>
  );
};

export default App;
