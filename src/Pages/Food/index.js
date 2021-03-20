import React, { useEffect, useLayoutEffect } from "react";

import { useParams, useHistory } from "react-router-dom";

import { Layout, Card, Button, Typography, Spin } from "antd";
import {
  EditOutlined,
  CloseOutlined,
  UserOutlined,
  DollarCircleOutlined,
} from "@ant-design/icons";

import Axios from "axios";
import { useNotification } from "../../hooks";
import ChangeFoodName from "../../Components/Modals/ChangeName";
import ChangeFoodPrice from "../../Components/Modals/ChangePrice";

const Food = () => {
  const { id } = useParams();
  const history = useHistory();
  const notification = useNotification();

  const [food, setFood] = React.useState(null);

  const [modalFoodNameVisible, setModalFoodChangeNameVisible] = React.useState(
    false
  );

  const [modalFoodPriceVisible, setModalFoodPriceVisible] = React.useState(
    false
  );

  const [, setIsUser] = React.useState(false);

  useLayoutEffect(() => {
    const { role } = JSON.parse(localStorage.getItem("user"));
    if (role === 1) {
      setIsUser(true);
    }
  }, []);

  useEffect(() => {
    const fetchFood = async () => {
      const { data } = await Axios(
        `${process.env.REACT_APP_API_BASE_URL}/api/food/${id}`
      );

      setFood(data);
    };

    fetchFood();
  }, [id]);

  const deleteFood = async () => {
    try {
      await Axios.delete(
        `${process.env.REACT_APP_API_BASE_URL}/api/food/${food._id}`
      );
      notification(
        "success",
        `${food.name} был(а) удален(а)`,
        `${food.name} успешно удален(а)`
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
        {food ? (
          <Card
            key={food._id}
            style={{ maxWidth: "500px" }}
            cover={
              <img
                alt="example"
                src={food.imageUrl}
                style={{
                  height: "100%",
                  objectFit:
                    food.imageOrientation === "vertical" ? "contain" : "cover",
                }}
              />
            }
          >
            <Card.Meta />
            <Typography.Title level={2} style={{ margin: "10px 0 0" }}>
              {food.name}
            </Typography.Title>
            <Typography.Title level={4} style={{ margin: "10px 0 0" }}>
              цена: {food.price}р.
            </Typography.Title>
            <Typography.Title
              level={5}
              style={{ margin: "10px 0 0", color: "gray" }}
            >
              Ресторан: {food.restaurantId.name}
            </Typography.Title>
          </Card>
        ) : (
          <Spin />
        )}
      </Layout>
      {food && (
        <>
          <ChangeFoodName
            food={food}
            changeNameVisible={modalFoodNameVisible}
            setChangeNameVisible={setModalFoodChangeNameVisible}
          />
          <ChangeFoodPrice
            food={food}
            modalChangeFoodVisible={modalFoodPriceVisible}
            setModalChangeFoodVisible={setModalFoodPriceVisible}
          />
        </>
      )}
    </>
  );
};

export default Food;
