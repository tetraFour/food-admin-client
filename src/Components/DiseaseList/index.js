import React, { useMemo } from "react";

import { Table, Typography } from "antd";

const columns = [
  {
    title: "№",
    dataIndex: "id",
    key: "id",
    render: text => <Typography>{text}</Typography>
  },
  {
    title: "Наименование болезни",
    dataIndex: "name",
    key: "name"
  }
];

const DiseaseList = ({ disease }) => {
  console.log(disease);

  const data = useMemo(() => {
    return disease.map((disease, id) => ({
      key: disease._id,
      id: id + 1,
      name: disease.diseaseType,
      recommendations: disease.recommendations
    }));
  }, [disease]);

  return (
    <Table
      expandable={{
        expandedRowRender: record => (
          <p style={{ margin: 0 }}>{record.recommendations}</p>
        )
      }}
      locale={{ emptyText: "болезней нет" }}
      className="dis-table"
      columns={columns}
      dataSource={data}
      pagination={false}
    />
  );
};

export default DiseaseList;
