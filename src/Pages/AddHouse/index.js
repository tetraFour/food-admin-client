import React from "react";

import { Layout, Input, Button, Form, Typography } from "antd";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useNotification } from "../../hooks";

const { Title, Text, Paragraph } = Typography;

const AddHousePage = () => {
  const [houseData, setHouseData] = React.useState({
    name: "",
    site: "",
    address: "",
  });

  const [isLoading, setIsLoading] = React.useState(false);
  const [form] = Form.useForm();

  const history = useHistory();

  const notification = useNotification();

  const onSubmit = async (e) => {
    try {
      setIsLoading(true);
      e.preventDefault();
      await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/restaurant/add-house`,
        houseData
      );
      notification("success", "Ресторан создано", `Вы успешно создали блюдо!`);
    } catch (e) {
      notification("error", "Ошибка", `Что-то пошло не так!`);
      console.log(e);
    } finally {
      setIsLoading(false);
    }

    history.push("/home");
  };

  const onChange = (e) => {
    setHouseData({ ...houseData, [e.target.name]: e.target.value });
  };

  return (
    <Layout
      className="site-layout"
      style={{
        padding: "30px",
      }}
    >
      <Typography>
        <Title>Создание заведения</Title>
        <Paragraph>
          Здвесь вы можете создать заведение с такими полями как:{" "}
          <Text strong>название заведения</Text>, <Text strong>сайт</Text>,{" "}
          <Text strong>адрес.</Text>
        </Paragraph>
      </Typography>
      <Layout
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Form
          style={{ width: "60%" }}
          form={form}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
        >
          <Form.Item
            name="name"
            label="Название"
            rules={[
              { required: true, message: "Поле должно быть заполненным" },
            ]}
          >
            <Input
              onChange={onChange}
              value={houseData.name}
              placeholder="наименование заведения"
              name="name"
              style={{ marginBottom: "15px" }}
            />
          </Form.Item>
          <Form.Item
            name="size"
            label="Сайт"
            rules={[
              { required: true, message: "Поле должно быть заполненным" },
            ]}
          >
            <Input
              onChange={onChange}
              value={houseData.address}
              placeholder="Сайт"
              name="site"
              style={{ marginBottom: "15px" }}
            />
          </Form.Item>
          <Form.Item
            name="address"
            label="Email"
            rules={[
              { required: true, message: "Поле должно быть заполненным" },
            ]}
          >
            <Input
              onChange={onChange}
              value={houseData.address}
              placeholder="email"
              name="address"
              style={{ marginBottom: "15px" }}
            />
          </Form.Item>
          <Form.Item wrapperCol={{ span: 4, offset: 4 }}>
            <Button type="primary" htmlType="submit" onClick={onSubmit}>
              добавить
            </Button>
          </Form.Item>
        </Form>
      </Layout>
    </Layout>
  );
};

export default AddHousePage;
