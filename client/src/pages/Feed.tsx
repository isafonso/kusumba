import { FC, Fragment, useEffect, useState } from "react";
import "../styles/Feed.scss";
import { CardPost, NavBar, SideBar } from "../components";
import { Link, useNavigate, useParams } from "react-router-dom";

interface IDataProps {
  data: [
    {
      id: number;
      username: string;
      password: string;
      email: string;
      users_products: [
        {
          id: number;
          name: string;
          description: string;
          picture: string;
          price: number;
          userId: number;
        }
      ];
    }
  ];
}

const Feed: FC = () => {
  //Variables
  var token = String(localStorage?.getItem("token"));

  //Hooks
  const params = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState<IDataProps>();

  useEffect(() => {
    if (token === "null") {
      return navigate("/");
    } else {
      const getData = async () => {
        const res = await fetch("http://localhost:3333/feed", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        });
        const data = await res.json();
        setData(data?.data);
      };
      getData();
    }
  }, []);

  return (
    <Fragment>
      {token === "null" ? (
        <Fragment></Fragment>
      ) : (
        <div className="feed-container">
          <NavBar />
          <SideBar />
          <div className="feedCard">
            {/* @ts-ignore */}
            {data?.map((dt, i) => (
              <CardPost
                id={dt.id}
                email={dt.email}
                username={dt.username}
                products={dt.users_products}
                key={i}
              />
            ))}
          </div>
          <div className="addPost-container">
            <Link to={"/addPost"}>+</Link>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Feed;
