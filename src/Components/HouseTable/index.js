import React, { useEffect } from "react";
import { Table } from "antd";
import { useState } from "react";
import axios from "axios";

const columns = [
  {
    title: "#",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Название заведения",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Сайт",
    dataIndex: "restaurantSite",
    key: "restaurantSite",
    render: (text) => <a href={`https://${text}`}>{text}</a>,
  },
  {
    title: "эл. адресс",
    dataIndex: "email",
    key: "email",
    render: (text) => <a href={`mailto:${text}`}>{text}</a>,
  },
  {
    title: "Action",
    key: "action",
    render: (text, record) => (
      <span>
        <a href="/">Action 一 {record.name}</a>
        <span className="ant-divider" />
        <a href="/">Delete</a>
        <span className="ant-divider" />
        <a href="/" className="ant-dropdown-link">
          More actions
        </a>
      </span>
    ),
  },
];

export const HouseTable = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/api/restaurants/all-restaurants`
        );

        console.log(data);
        setRestaurants(
          data.map((rest, id) => ({
            id: id + 1,
            name: rest.name,
            restaurantSite: rest.site,
            email: rest.user?.email,
          }))
        );
      } catch (e) {
        console.log(e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ width: "100%" }}>
      <Table
        columns={columns}
        dataSource={restaurants}
        loading={isLoading}
        pagination={false}
      />
    </div>
  );
};
