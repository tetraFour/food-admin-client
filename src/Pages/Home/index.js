import React from "react";

import { Layout } from "antd";
import { observer } from "mobx-react-lite";

import AppHeader from "../../Components/Header";
import FoodList from "../../Components/FoodList";
import { delay } from "../../helpers";
import { foodStore } from "../../store";
import axios from "axios";

const HomePage = ({ toggle, collapsed }) => {
  const [inputValue, setInputValue] = React.useState("");
  // const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchFood = async () => {
      await foodStore.getFoodList();

      // setFood(data);
      // setIsLoading(false);
      // console.log(data);
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
      />
      <FoodList
        inputValue={inputValue}
        food={foodStore.foodList}
        isLoading={foodStore.isLoading}
      />
    </Layout>
  );
};

export default observer(HomePage);
