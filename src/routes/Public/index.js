import React from "react";
import { Route, Redirect } from "react-router-dom";

const PublicRoute = ({ Component, exact, path, children }) => {
  const isAuth = !!localStorage.getItem("user");
  console.log("PUBLIC_ROUTE");
  console.log(isAuth);

  return (
    <Route
      path={path}
      exact={exact}
      render={(props) =>
        isAuth ? <Redirect to="/home" /> : <Component {...props} />
      }
    />
  );
};

export default PublicRoute;
