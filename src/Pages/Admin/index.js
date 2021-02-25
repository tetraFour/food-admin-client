import React from "react";

import axios from "axios";
import { useHistory } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import { Layout, Button, Input } from "antd";
import { clearObject } from "../../helpers";

const AdminPage = () => {
  const history = useHistory();

  const [data, setData] = React.useState({
    name: "",
    password: "",
    phone: "",
    login: "",
    surname: "",
    email: ""
  });

  const onChange = ({ target: { name, value } }) => {
    setData({ ...data, [name]: value });
  };

  const onSubmit = async e => {
    e.preventDefault();

    const password = uuidv4();
    const finalData = { ...data, password };

    try {
      await axios.post("http://localhost:8060/api/registration", finalData);
      setData(clearObject);
      history.push("/home");
    } catch (error) {}
  };

  return (
    <Layout
      className="site-layout"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <form onSubmit={onSubmit} style={{ maxWidth: "600px" }}>
        <Input
          onChange={onChange}
          value={data.name}
          name="name"
          placeholder="имя"
          style={{ marginBottom: "15px" }}
        />
        <Input
          onChange={onChange}
          value={data.surname}
          name="surname"
          placeholder="фамилия"
          style={{ marginBottom: "15px" }}
        />
        <Input
          onChange={onChange}
          value={data.login}
          name="login"
          placeholder="логин"
          style={{ marginBottom: "15px" }}
        />
        <Input
          onChange={onChange}
          value={data.email}
          name="email"
          placeholder="почта"
          style={{ marginBottom: "15px" }}
        />
        <Input
          onChange={onChange}
          value={data.phone}
          name="phone"
          placeholder="телефон"
          style={{ marginBottom: "15px" }}
        />
        <Button type="primary" htmlType="submit">
          добавить
        </Button>
      </form>
    </Layout>
  );
};

export default AdminPage;
