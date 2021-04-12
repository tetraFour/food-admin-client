import React, { useEffect, useLayoutEffect, useState } from "react";

import { useParams, useHistory } from "react-router-dom";

import { observer } from "mobx-react-lite";

import { Layout, Card, Button, Typography, Spin } from "antd";
import {
  EditOutlined,
  CloseOutlined,
  UserOutlined,
  DollarCircleOutlined,
} from "@ant-design/icons";

import Axios from "axios";
import { foodStore } from "../../store";
import { useNotification } from "../../hooks";
import ChangeFoodName from "../../Components/Modals/ChangeName";
import ChangeFoodPrice from "../../Components/Modals/ChangePrice";

const FoodPage = () => {
  const { id } = useParams();
  const history = useHistory();
  const notification = useNotification();

  // const [food, setFood] = React.useState(null);

  const [modalFoodNameVisible, setModalFoodChangeNameVisible] = React.useState(
    false
  );

  const [modalFoodPriceVisible, setModalFoodPriceVisible] = React.useState(
    false
  );

  const [isLoading, setIsLoading] = useState(true);

  // const [, setIsUser] = React.useState(false);

  // useLayoutEffect(() => {
  //   const { role } = JSON.parse(localStorage.getItem("user"));
  //   if (role === 1) {
  //     setIsUser(true);
  //   }
  // }, []);

  React.useEffect(() => {
    const fetchFood = async () => {
      try {
        await foodStore.getCurrentFood(id);
        setIsLoading(false);
      } catch (e) {
        console.log("ERROR: ", e);
      }
    };

    fetchFood();
  }, [id]);

  const deleteFood = async () => {
    try {
      await Axios.delete(
        `${process.env.REACT_APP_API_BASE_URL}/product/${foodStore.currentFood._id}`
      );
      notification(
        "success",
        `${foodStore.food.name} удален(а)!`,
        `${foodStore.food.name} успешно удален(а)`
      );
      history.push("/home");
    } catch (error) {
      notification("error", `Упс!`, `Что-то пошло не так!`);
    }
  };

  return (
    <>
      <Layout
        className="site-layout"
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <div className="button-wrapper">
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => setModalFoodChangeNameVisible(true)}
          >
            Изменить Название
          </Button>
          <Button type="primary" icon={<UserOutlined />}>
            Изменить ресторан
          </Button>
          <Button
            icon={<DollarCircleOutlined />}
            onClick={() => setModalFoodPriceVisible(true)}
          >
            Изменить цену
          </Button>
          <Button
            type="primary"
            danger
            icon={<CloseOutlined />}
            onClick={deleteFood}
          >
            Удалить продукт
          </Button>
        </div>
        {!isLoading ? (
          <Card
            key={foodStore.food._id}
            style={{ maxWidth: "500px" }}
            cover={
              <img
                alt="example"
                src={foodStore.food.imageUrl}
                style={{
                  height: "100%",
                  objectFit:
                    foodStore.food.imageOrientation === "vertical"
                      ? "contain"
                      : "cover",
                }}
              />
            }
          >
            <Card.Meta />
            <Typography.Title level={2} style={{ margin: "10px 0 0" }}>
              {foodStore.food.name}
            </Typography.Title>
            <Typography.Title level={4} style={{ margin: "10px 0 0" }}>
              цена: {foodStore.food.price}р.
            </Typography.Title>
            <Typography.Title
              level={5}
              style={{ margin: "10px 0 0", color: "gray" }}
            >
              Ресторан: {foodStore.food.restaurantId.name}
            </Typography.Title>
          </Card>
        ) : (
          <Spin />
        )}
      </Layout>
      {!isLoading && (
        <>
          <ChangeFoodName
            food={foodStore.food}
            changeNameVisible={modalFoodNameVisible}
            setChangeNameVisible={setModalFoodChangeNameVisible}
          />
          <ChangeFoodPrice
            food={foodStore.food}
            modalChangeFoodVisible={modalFoodPriceVisible}
            setModalChangeFoodVisible={setModalFoodPriceVisible}
          />
        </>
      )}
    </>
  );
};

export default observer(FoodPage);
