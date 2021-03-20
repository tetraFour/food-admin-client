import React, { useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns";
import { Table } from "antd";

const columns = [
  {
    title: "#",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Пользователь",
    dataIndex: "username",
    key: "username",
  },
  {
    title: "эл. адресс",
    dataIndex: "email",
    key: "email",
    render: (text) => <a href={`mailto://${text}`}>{text}</a>,
  },
  {
    title: "дата создания",
    dataIndex: "createdAt",
    key: "createdAt",
    render: (createdAt) => <p>{format(new Date(createdAt), "MM/dd/yyyy")}</p>,
  },
  {
    title: "роль",
    dataIndex: "role",
    key: "role",
    render: (role) => (
      <p>{role === 1 ? "Пользователь" : role === 2 ? "Админ" : "Ресторан"}</p>
    ),
  },
];

const UsersTable = () => {
  const [usersList, setUsersList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axios(
          `${process.env.REACT_APP_API_BASE_URL}/api/get-users`
        );
        setUsersList(data);
      } catch (e) {
        console.log(e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div style={{ width: "100%" }}>
      <Table columns={columns} dataSource={usersList} loading={isLoading} />
    </div>
  );
};

export default UsersTable;
