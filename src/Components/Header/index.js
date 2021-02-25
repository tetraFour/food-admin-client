import React from "react";
import { Input, Layout } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";

const Header = ({ collapsed, toggle, inputValue, setInputValue }) => {
  const inputHandler = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <Layout.Header className="site-layout-background header-nav">
      {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
        className: "trigger",
        onClick: toggle,
      })}
      <Input
        placeholder="поиск по имени"
        value={inputValue}
        className="header__search-input"
        onChange={inputHandler}
      />
    </Layout.Header>
  );
};

export default Header;
