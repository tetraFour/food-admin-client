import React from "react";

import { useHistory } from "react-router-dom";

import { Input, Modal } from "antd";
import axios from "axios";

const ChangeFoodName = ({ changeNameVisible, setChangeNameVisible, food }) => {
  const history = useHistory();

  const [foodName, setFoodName] = React.useState(food.name);

  const handleOk = async () => {
    await axios.patch(`http://localhost:7000/api/food/${food._id}`, {
      field: "name",
      value: foodName,
    });
    setChangeNameVisible((prev) => !prev);
    history.push("/home");
  };

  const handleCancel = () => {
    setChangeNameVisible((prev) => !prev);
  };

  return (
    food && (
      <Modal
        title={`Название продукта: ${food.name}`}
        visible={changeNameVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Input
          value={foodName}
          onClick={(e) => e.target.select()}
          onChange={(e) => setFoodName(e.target.value)}
        />
      </Modal>
    )
  );
};

export default ChangeFoodName;
