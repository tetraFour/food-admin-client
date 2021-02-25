import React from "react";
import { Modal, Input } from "antd";
import axios from "axios";
import { useNotification } from "../../hooks";

const AddDisease = ({ addDisease, setAddDisease, user, card }) => {
  const notification = useNotification();
  const [disease, setDisease] = React.useState("");
  const [recommendations, setRecommendations] = React.useState("");

  const handleOk = async () => {
    await axios.post(
      "https://hospital-course-backend.herokuapp.com/api/disease/add-disease",
      {
        diseaseType: disease,
        cardId: card,
        recommendations,
      }
    );
    notification(
      "success",
      "Болезнь добавлена",
      `Болезнь успешно добавлена в карту пациента ${user}`
    );
    handleCancel();
  };

  const handleCancel = () => {
    setAddDisease((prev) => !prev);
  };

  return (
    <Modal
      title="Добавить болезнь"
      visible={addDisease}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Input
        value={disease}
        placeholder="введите болезнь"
        style={{ display: "flex", width: "100%", marginBottom: "15px" }}
        onChange={(e) => setDisease(e.target.value)}
      />
      <Input
        value={recommendations}
        placeholder="рекомендации к лечению"
        style={{ display: "flex", width: "100%", marginBottom: "15px" }}
        onChange={(e) => setRecommendations(e.target.value)}
      />
    </Modal>
  );
};

export default AddDisease;
