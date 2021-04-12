import React from "react";
import { Layout, Input, Button, Form } from "antd";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import { useLocalStorage, useNotification } from "../../hooks";

const styles = {
  height: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const formStyle = {
  width: "500px",
  display: "flex",
  flexDirection: "column",
};

const AuthPage = () => {
  const history = useHistory();
  const notification = useNotification();

  const [authCred, setAuthCred] = React.useState({
    login: "",
    password: "",
  });

  const [user, setUser] = useLocalStorage("user", "");

  const [isLoading, setIsLoading] = React.useState(false);

  const [form] = Form.useForm();

  const onChange = ({ target: { name, value } }) => {
    setAuthCred({ ...authCred, [name]: value });
  };
  const submitHandler = async () => {
    setIsLoading(true);
    try {
      const { data } = await Axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/auth/login`,
        authCred
      );
      setUser(data);
      console.log(user);
      setIsLoading(false);
      history.push("/home");
      notification("success", "Успешный вход", `Вы вошли как ${data.login}`);
    } catch (e) {
      setIsLoading(false);
      notification("error", "Ошибка", `Что-то пошло не так!`);
    }
  };

  return (
    <Layout style={styles}>
      <h1>Вход</h1>
      <Form
        style={formStyle}
        onFinish={submitHandler}
        form={form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
      >
        <Form.Item
          name="login"
          label="Логин"
          rules={[{ required: true, message: "Поле должно быть заполненным" }]}
          style={{ justifyContent: "center" }}
        >
          <Input
            name="login"
            value={authCred.login}
            onChange={onChange}
            placeholder="логин"
          />
        </Form.Item>
        <Form.Item
          name="password"
          label="Пароль"
          rules={[{ required: true, message: "Поле должно быть заполненным" }]}
          style={{ justifyContent: "center" }}
        >
          <Input.Password
            name="password"
            onChange={onChange}
            value={authCred.password}
            placeholder="пароль"
          />
        </Form.Item>
        <Form.Item wrapperCol={{ span: 4, offset: 7 }}>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            {isLoading ? "вход..." : "войти"}
          </Button>
        </Form.Item>
      </Form>
    </Layout>
  );
};

export default AuthPage;
