import React from "react";
import { Typography, Layout } from "antd";
import { HouseTable } from "../../Components/HouseTable";
import UsersTable from "../../Components/UsersTable";

const { Title, Paragraph } = Typography;

const styles = {
  padding: "30px",
};

const AllDataPage = () => {
  return (
    <Layout style={styles}>
      <Typography>
        <Title>Заведения</Title>
        <Paragraph>Информация о всех заведениях</Paragraph>
        <HouseTable />
        <Title>Пользователи</Title>
        <Paragraph>Информация о всех пользователях</Paragraph>
        <UsersTable />
      </Typography>
    </Layout>
  );
};

export default AllDataPage;
