import React, { useEffect, useLayoutEffect } from "react";

import { useParams, useHistory } from "react-router-dom";

import { Layout, Card, Button, Typography, Spin } from "antd";
import {
  EditOutlined,
  CloseOutlined,
  UserOutlined,
  DollarCircleOutlined,
} from "@ant-design/icons";

import cardIcon from "../../assets/images/medical.svg";

import AddDisease from "../../Components/Modals/AddDisease";
import DiseaseList from "../../Components/DiseaseList";
import Axios from "axios";
import { useNotification } from "../../hooks";
import { delay } from "../../helpers";
import ChangeFoodName from "../../Components/Modals/ChangeName";
import ChangeFoodPrice from "../../Components/Modals/ChangePrice";

// const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const Food = () => {
  const { id } = useParams();
  const history = useHistory();
  const notification = useNotification();

  const [food, setFood] = React.useState(null);

  // const [inc, setInc] = React.useState(0);

  // const [changeAddDiseaseVisible, setChangeAddDiseaseVisible] = React.useState(
  //   null
  // );
  let start = 0.1;

  const [timer, setTimer] = React.useState("");
  const [time, setTime] = React.useState(start * 60);

  // let time = start * 60;

  const updateCountdown = React.useCallback(() => {
    const minutes = Math.floor(time / 60);

    let seconds = time % 60;

    seconds = seconds < 10 ? "0" + seconds : seconds;

    setTimer(`${minutes}:${seconds}`);
    setTime(time - 1);
  }, [time]);

  useEffect(() => {
    const countDown = setInterval(updateCountdown, 1000);
    if (time === -1) {
      clearInterval(countDown);
      return;
    }
    return () => {
      clearInterval(countDown);
    };
  }, [time, updateCountdown]);

  useEffect(() => {
    const handleNotify = () => {
      notification("success", "Заказ готов!", `блюдо номер 32 готово!`);
    };

    const finalTimer = setTimeout(handleNotify, 7000);
    return () => {
      clearInterval(finalTimer);
    };
  }, []);

  const [modalFoodNameVisible, setModalFoodChangeNameVisible] = React.useState(
    false
  );

  const [modalFoodPriceVisible, setModalFoodPriceVisible] = React.useState(
    false
  );

  const [isUser, setIsUser] = React.useState(false);

  useLayoutEffect(() => {
    const { role } = JSON.parse(localStorage.getItem("user"));
    if (role === 1) {
      setIsUser(true);
    }
  }, []);

  React.useEffect(() => {
    const fetchFood = async () => {
      await delay(2000);
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
        {timer}
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
