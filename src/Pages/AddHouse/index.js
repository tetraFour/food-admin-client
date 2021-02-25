import React from "react";

import { Layout, Input, Button, Form } from "antd";
import axios from "axios";
import { useHistory } from "react-router-dom";

const AddHousePage = () => {
  const [houseData, setHouseData] = React.useState({ name: "", site: "" });

  const history = useHistory();

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8060/api/add-house", houseData);
    history.push("/home");
  };

  const onChange = (e) => {
    setHouseData({ ...houseData, [e.target.name]: e.target.value });
  };

  return (
    <Layout
      className="site-layout"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Form onSubmit={onSubmit}>
        <Form.Item>
          <Input
            onChange={onChange}
            value={houseData.name}
            placeholder="наименование заведения"
            name="name"
            style={{ marginBottom: "15px" }}
          />
        </Form.Item>
        <Form.Item>
          <Input
            onChange={onChange}
            value={houseData.address}
            placeholder="адрес"
            name="address"
            style={{ marginBottom: "15px" }}
          />
        </Form.Item>
        <Form.Item>
          <Input
            onChange={onChange}
            value={houseData.address}
            placeholder="адрес"
            name="address"
            style={{ marginBottom: "15px" }}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            добавить
          </Button>
        </Form.Item>
      </Form>
    </Layout>
  );
};

export default AddHousePage;
