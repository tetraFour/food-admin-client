import React from "react";

import { useHistory } from "react-router-dom";

import { InputNumber, Modal } from "antd";
import axios from "axios";

const ChangeFoodPrice = ({
  modalChangeFoodVisible,
  setModalChangeFoodVisible,
  food,
}) => {
  const history = useHistory();

  const [foodPrice, setFoodPrice] = React.useState(food.price);

  const handleChange = (value) => {
    setFoodPrice(value);
  };

  const handleOk = async () => {
    await axios.patch(`http://localhost:7000/api/food/${food._id}`, {
      field: "price",
      value: foodPrice,
    });
    setModalChangeFoodVisible((prev) => !prev);
    history.push("/home");
  };

  const handleCancel = () => {
    setModalChangeFoodVisible((prev) => !prev);
  };

  return (
    food && (
      <Modal
        title={`Название продукта: ${food.name}`}
        visible={modalChangeFoodVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <InputNumber
          value={foodPrice}
          onClick={(e) => e.target.select()}
          onChange={handleChange}
          style={{ width: "100%" }}
        />
      </Modal>
    )
  );
};

export default ChangeFoodPrice;
