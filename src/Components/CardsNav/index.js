import React from "react";

import { Layout, Menu } from "antd";

import { ReactComponent as FoodLogo } from "../../assets/images/salad.svg";

import { ReactComponent as AddFoodIcon } from "../../assets/images/add-food.svg";
import { ReactComponent as AddRestaurantIcon } from "../../assets/images/add-restaurant.svg";
import { ReactComponent as FoodIcon } from "../../assets/images/tray.svg";
// import { ReactComponent as RestaurantIcon } from "../../assets/images/shop.svg";
import { ReactComponent as LogoutIcon } from "../../assets/images/logout.svg";
import { ReactComponent as TableIcon } from "../../assets/images/table.svg";

import { Link, useHistory } from "react-router-dom";
import { useNotification } from "../../hooks";

const { Sider } = Layout;

const menuItems = [
  {
    id: "1",
    to: "/home",
    title: "еда",
    styles: {
      display: "flex",
      alignItems: "center",
    },
    icon: <FoodIcon />,
  },

  {
    id: "2",
    to: "/add-new-food",
    title: "Добавить еду",
    styles: {
      display: "flex",
      alignItems: "center",
    },
    icon: <AddFoodIcon />,
  },
  {
    id: "3",
    to: "/add-new-house",
    title: "Добавить ресторан",
    styles: {
      display: "flex",
      alignItems: "center",
    },
    icon: <AddRestaurantIcon />,
  },
  {
    id: "4",
    to: "/full-data",
    title: "таблица",
    styles: {
      display: "flex",
      alignItems: "center",
    },
    icon: <TableIcon />,
  },
];

const BooksNav = ({ collapsed }) => {
  const history = useHistory();

  const notification = useNotification();

  // const [isUser, setIsUser] = React.useState(false);
  //
  // useEffect(() => {
  //   const { role } = JSON.parse(localStorage.getItem("user"));
  //   if (role === 1) {
  //     setIsUser(true);
  //   }
  // }, []);

  const logoutHandler = () => {
    localStorage.removeItem("user");
    history.push("/");
    notification("success", "Успешный выход", `Вы вышли из аккаунта!`);
  };

  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div
        className="logo"
        style={{ cursor: "pointer" }}
        onClick={() => history.push("/home")}
      >
        <FoodLogo />
      </div>
      <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
        {menuItems.map((item) => (
          <Menu.Item key={item.id} icon={item.icon} style={item.styles}>
            <Link to={item.to}>{item.title}</Link>
          </Menu.Item>
        ))}
        <Menu.Item
          key="5"
          icon={<LogoutIcon />}
          style={{ display: "flex", alignItems: "center" }}
        >
          <button className="exit-button" onClick={logoutHandler}>
            Выйти
          </button>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default BooksNav;
