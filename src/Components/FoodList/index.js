import React from "react";

import { useHistory } from "react-router-dom";
// import axios from "axios";

import { Layout, Card, Skeleton } from "antd";
// import { delay } from "../../helpers";

const { Content } = Layout;

const { Meta } = Card;

const FoodList = ({ food, isLoading, inputValue }) => {
  const history = useHistory();

  // const [food, setFood] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);

  // const { role } = JSON.parse(localStorage.getItem("user"));

  // React.useEffect(() => {
  //   const fetchFood = async () => {
  //     await delay(2000);
  //     const { data } = await axios(
  //       `${process.env.REACT_APP_API_BASE_URL}/get-food`
  //     );
  //
  //     setFood(data);
  //     setIsLoading(false);
  //     console.log(data);
  //   };
  //
  //   fetchFood();
  // }, []);

  const filter = (item) => {
    if (inputValue === "") {
      return item;
    } else if (item.name.toLowerCase().includes(inputValue.toLowerCase())) {
      return item;
    }
  };

  if (isLoading) {
    return (
      <Content className="site-layout-background site-layout-background__book-list">
        <Skeleton style={{ width: 240, height: 280 }} active />
        <Skeleton style={{ width: 240, height: 280 }} active />
        <Skeleton style={{ width: 240, height: 280 }} active />
        <Skeleton style={{ width: 240, height: 280 }} active />
        <Skeleton style={{ width: 240, height: 280 }} active />
      </Content>
    );
  }

  return (
    <Content className="site-layout-background site-layout-background__book-list">
      {food &&
        food.filter(filter).map((f) => (
          <Card
            key={f._id}
            hoverable
            style={{ width: 240 }}
            cover={
              <img
                alt="example"
                src={
                  !!f.imageUrl.length
                    ? f.imageUrl
                    : "https://news.aut.ac.nz/__data/assets/image/0006/92328/placeholder-image10.jpg"
                }
                style={{ height: "100%", objectFit: "cover" }}
                onClick={() => {
                  history.push(`/food/${f._id}`);
                }}
              />
            }
          >
            <Meta title={f.name} description={`цена: ${f.price}р.`} />
          </Card>
        ))}
    </Content>
  );
};

export default FoodList;
