import React from "react";

import axios from "axios";

import { useHistory } from "react-router-dom";

import { Layout, Button, Input, InputNumber, Select, Upload, Form } from "antd";

import { UploadOutlined } from "@ant-design/icons";

import { useNotification } from "../../hooks";
import { api } from "../../helpers/api";

const { Option } = Select;

const AddFoodPage = () => {
  const history = useHistory();
  const notification = useNotification();

  const [data, setData] = React.useState({
    name: "",
    type: "",
  });

  const [file, setFile] = React.useState({});

  const [restaurants, setRestaurants] = React.useState([]);

  const [form] = Form.useForm();

  const props = {
    listType: "picture",
    maxCount: 1,
    accept: "image/png, image/jpeg",
    onRemove: () => {
      setFile({});
    },
    beforeUpload: (file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setFile(reader.result);
      };

      return false;
    },
    file,
  };

  const onChange = ({ target: { name, value } }) => {
    setData({ ...data, [name]: value });
  };

  const onChangePrice = (value) => {
    setData({ ...data, price: value });
  };

  const onChangeTile = (value) => {
    setData({ ...data, time: value });
  };

  const onRestaurantInputChange = (value) => {
    setData({ ...data, restaurantId: value });
  };

  const handleSearch = (value) => {
    if (value) {
      api(value, (data) => setRestaurants(data));
    } else {
      setRestaurants([]);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const finalData = {
        ...data,
        file,
      };
      await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/food`,
        finalData
      );
      notification(
        "success",
        `Блюдо '${data.name}' создано`,
        `Вы успешно создали блюдо!`
      );
      history.push("/");
    } catch (error) {
      notification("error", "Ошибка", `Что-то пошло не так!`);
      console.log(error);
    }
  };

  const options = restaurants.map((restaurant) => (
    <Option key={restaurant.value}>{restaurant.text}</Option>
  ));

  return (
    <Layout
      className="site-layout"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Form
        onSubmit={onSubmit}
        form={form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        style={{ width: "60%" }}
      >
        <Form.Item
          name="name"
          label="Название"
          rules={[{ required: true, message: "Поле должно быть заполненным" }]}
        >
          <Input
            onChange={onChange}
            value={data.name}
            name="name"
            placeholder="название продукта"
          />
        </Form.Item>
        <Form.Item
          name="type"
          label="Тип продукта"
          rules={[{ required: true, message: "Поле должно быть заполненным" }]}
        >
          <Input
            onChange={onChange}
            value={data.type}
            name="type"
            placeholder="тип продукта"
          />
        </Form.Item>
        <Form.Item
          name="price"
          label="Цена"
          rules={[{ required: true, message: "Поле должно быть заполненным" }]}
        >
          <InputNumber
            value={data.price}
            name="price"
            min={0}
            max={100}
            placeholder="цена"
            onChange={onChangePrice}
            style={{ display: "flex", width: "100%" }}
          />
        </Form.Item>
        <Form.Item
          name="time"
          label="Время"
          rules={[{ required: true, message: "Поле должно быть заполненным" }]}
        >
          <InputNumber
            value={data.time}
            name="time"
            min={0}
            max={60}
            placeholder="время приготовления"
            onChange={onChangeTile}
            style={{ display: "flex", width: "100%" }}
          />
        </Form.Item>
        <Form.Item
          name="restaurant"
          label="Ресторан"
          rules={[{ required: true, message: "Поле должно быть заполненным" }]}
        >
          <Select
            showSearch
            value={data.restaurantId}
            placeholder="ресторан"
            style={{ display: "flex", width: "100%" }}
            defaultActiveFirstOption={false}
            showArrow={false}
            filterOption={false}
            onSearch={handleSearch}
            onChange={onRestaurantInputChange}
            notFoundContent={null}
          >
            {options}
          </Select>
        </Form.Item>
        <Form.Item
          name="image"
          label="Ресторан"
          rules={[{ required: true, message: "Добавьте фото" }]}
        >
          <div>
            <Upload {...props}>
              <Button icon={<UploadOutlined />}>Фото товара</Button>
            </Upload>
          </div>
        </Form.Item>
        <Form.Item wrapperCol={{ span: 4, offset: 4 }}>
          <Button type="primary" htmlType="submit">
            добавить
          </Button>
        </Form.Item>
      </Form>
    </Layout>
  );
};

export default AddFoodPage;
