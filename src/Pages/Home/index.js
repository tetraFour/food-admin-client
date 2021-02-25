import React from "react";

import { Layout } from "antd";

import AppHeader from "../../Components/Header";
import FoodList from "../../Components/FoodList";
import { delay } from "../../helpers";
import axios from "axios";

const HomePage = ({ toggle, collapsed }) => {
  const [inputValue, setInputValue] = React.useState("");
  const [food, setFood] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchFood = async () => {
      await delay(2000);
      const { data } = await axios(
        `${process.env.REACT_APP_API_BASE_URL}/get-food`
      );

      setFood(data);
      setIsLoading(false);
      console.log(data);
    };

    fetchFood();
  }, []);

  return (
    <Layout className="site-layout">
      <AppHeader
        toggle={toggle}
        collapsed={collapsed}
        inputValue={inputValue}
        setInputValue={setInputValue}
        food={food}
        setFood={setFood}
      />
      <FoodList inputValue={inputValue} food={food} isLoading={isLoading} />
    </Layout>
  );
};

export default HomePage;
