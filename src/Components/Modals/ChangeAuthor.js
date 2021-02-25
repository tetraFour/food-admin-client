import React from "react";

import { useParams, useHistory } from "react-router-dom";

import { Input, Modal, Spin, Select } from "antd";
import axios from "axios";

const ChangeAuthor = ({
  changeAuthorVisible,
  setChangeAuthorVisible,
  book
}) => {
  const history = useHistory();

  const [author, setAuthor] = React.useState("");
  const [isFetching, setIsFetching] = React.useState(false);
  const [authors, setAuthors] = React.useState([]);
  const [currentAuthor, setCurrentAuthor] = React.useState({});

  const handleOk = async () => {
    const finalBook = { ...book };
    finalBook.author.id = currentAuthor.value;
    delete finalBook.author.name;
    delete finalBook.author.surname;
    delete finalBook.author.about;
    delete finalBook.publishingHouse.address;
    // console.log(finalBook, currentAuthor);
    await axios.post("http://localhost:8060/api/edit-book", finalBook);
    setChangeAuthorVisible(prev => !prev);
    history.push("/home");
  };

  const handleCancel = () => {
    setChangeAuthorVisible(prev => !prev);
  };

  const fetchAuthors = async () => {
    setIsFetching(true);
    const { data } = await axios("http://localhost:8060/api/authors");
    setAuthors(data);
    setIsFetching(false);
  };

  return (
    book && (
      <Modal
        title={`Автор: ${book.author.name} ${book.author.surname}`}
        visible={changeAuthorVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {/* <Input value={author} onChange={(e) => setAuthor(e.target.value)} /> */}
        <Select
          labelInValue
          value={currentAuthor.name}
          showSearch
          defaultActiveFirstOption={false}
          placeholder="выберите автора"
          notFoundContent={isFetching ? <Spin size="small" /> : null}
          filterOption={false}
          onSearch={fetchAuthors}
          onChange={setCurrentAuthor}
          style={{ width: "100%", marginBottom: "15px" }}
        >
          {authors.map(d => (
            <Select.Option key={d.id}>
              {d.name} {d.surname}
            </Select.Option>
          ))}
        </Select>
      </Modal>
    )
  );
};

export default ChangeAuthor;
