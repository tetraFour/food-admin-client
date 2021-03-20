import React from "react";

import axios from "axios";

import { useHistory } from "react-router-dom";

import {
  Layout,
  Button,
  Input,
  InputNumber,
  Select,
  Upload,
  Form,
  Radio,
  Slider,
  Typography,
} from "antd";

import { UploadOutlined } from "@ant-design/icons";

import { useNotification } from "../../hooks";
import { api } from "../../helpers/api";

const { Title, Paragraph, Text } = Typography;
const { Option } = Select;

const formatter = (value) => `${value} минут(ы)`;

const AddFoodPage = () => {
  const history = useHistory();
  const notification = useNotification();

  const [data, setData] = React.useState({
    name: "",
    type: "",
    time: "",
  });

  const [file, setFile] = React.useState({});

  const [restaurants, setRestaurants] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

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

  const onRestaurantInputChange = (value) => {
    setData({ ...data, restaurantId: value });
  };

  const onChangePrice = (value) => {
    setData({ ...data, price: value });
  };

  const handleSearch = (value) => {
    if (value) {
      api(value, (data) => setRestaurants(data));
    } else {
      setRestaurants([]);
    }
  };

  const onRadioChange = (e) => {
    setData({ ...data, type: e.target.value });
  };

  const onSliderChange = (value) => {
    setData({ ...data, time: value });
  };

  const onSubmit = async () => {
    try {
      setIsLoading(true);
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
    } finally {
      setIsLoading(false);
    }
  };

  const options = restaurants.map((restaurant) => (
    <Option value={restaurant._id} key={restaurant.value}>
      {restaurant.text}
    </Option>
  ));

  return (
    <Layout
      className="site-layout"
      style={{
        padding: "30px",
      }}
    >
      <Typography>
        <Title>Создание продукта</Title>
        <Paragraph>
          Здвесь вы можете создать продукт с такими полями как:{" "}
          <Text strong>название продукта</Text>, <Text strong>цена</Text>,{" "}
          <Text strong>тип продукта</Text>,{" "}
          <Text strong>время приготовления продукта</Text>,
          <Text strong>ресторан</Text>,<Text strong>фото проукта</Text>.
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
          onFinish={onSubmit}
          form={form}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          style={{ width: "60%" }}
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
              value={data.name}
              name="name"
              placeholder="название продукта"
            />
          </Form.Item>
          <Form.Item
            name="price"
            label="Цена"
            rules={[
              { required: true, message: "Поле должно быть заполненным" },
            ]}
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
            name="type"
            label="Тип продукта"
            rules={[
              { required: true, message: "Поле должно быть заполненным" },
            ]}
          >
            <Radio.Group onChange={onRadioChange}>
              <Radio.Button value="food">еда</Radio.Button>
              <Radio.Button value="drink">напиток</Radio.Button>
              <Radio.Button value="bakery">выпечка</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            name="time"
            label="Время"
            rules={[
              { required: true, message: "Поле должно быть заполненным" },
            ]}
          >
            <Slider
              tipFormatter={formatter}
              defaultValue={0}
              onChange={onSliderChange}
            />
          </Form.Item>
          <Form.Item
            name="restaurant"
            label="Ресторан"
            rules={[
              { required: true, message: "Поле должно быть заполненным" },
            ]}
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
            <Button type="primary" htmlType="submit" loading={isLoading}>
              добавить
            </Button>
          </Form.Item>
        </Form>
      </Layout>
    </Layout>
  );
};

export default AddFoodPage;
