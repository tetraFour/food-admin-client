import React from "react";
import { Route, Redirect } from "react-router-dom";
import CardsNav from "../../Components/CardsNav";
import { Layout } from "antd";

const PrivateRoute = ({ Component, exact, path }) => {
  const isAuth = !!localStorage.getItem("user");
  const [collapsed, setCollapsed] = React.useState(false);

  const toggle = () => {
    setCollapsed(prev => !prev);
  };

  console.log("PRIVATE_ROUTE");
  console.log(isAuth);

  return (
    <Route
      exact={exact}
      path={path}
      render={props =>
        isAuth ? (
          <Layout>
            <CardsNav collapsed={collapsed} />
            <Component {...props} toggle={toggle} />
          </Layout>
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

export default PrivateRoute;
