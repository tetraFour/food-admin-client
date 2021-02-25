import React from "react";

import { useHistory } from "react-router-dom";

import { Modal, Select, Spin } from "antd";
import axios from "axios";

const ChangeBookName = ({
  addToBasketVisible,
  setAddToBasketVisible,
  book
}) => {
  const history = useHistory();

  const [bookName, setBookName] = React.useState("");
  const [isFetching, setIsFetching] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [users, setUsers] = React.useState([]);

  const handleOk = async () => {
    const finalBook = {
      book: { id: book.id },
      user: { id: currentUser.value }
    };
    // finalBook.name = bookName;
    // delete finalBook.author.name;
    // delete finalBook.author.surname;
    // delete finalBook.author.about;
    // delete finalBook.publishingHouse.address;
    await axios.post("http://localhost:8060/api/new-order", finalBook);
    setAddToBasketVisible(prev => !prev);
    history.push("/home");
  };

  const fetchUsers = async () => {
    setIsFetching(true);
    const { data } = await axios("http://localhost:8060/api/get-users");
    setUsers(data);
    setIsFetching(false);
  };

  const handleCancel = () => {
    setAddToBasketVisible(prev => !prev);
  };

  return (
    book && (
      <Modal
        title={`Название книги: ${book.name}`}
        visible={addToBasketVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Select
          labelInValue
          value={currentUser.name}
          showSearch
          defaultActiveFirstOption={false}
          placeholder="выберите автора"
          notFoundContent={isFetching ? <Spin size="small" /> : null}
          filterOption={false}
          onSearch={fetchUsers}
          onChange={setCurrentUser}
          style={{ width: "100%", marginBottom: "15px" }}
        >
          {users.map(d => (
            <Select.Option key={d.id}>
              {d.name} (логин: {d.login})
            </Select.Option>
          ))}
        </Select>
      </Modal>
    )
  );
};

export default ChangeBookName;
