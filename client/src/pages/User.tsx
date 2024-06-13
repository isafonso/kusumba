import { Fragment, useEffect, useState } from "react";
import { ListPost, NavBar, SideBar } from "../components";
import "../styles/User.scss";
import profile from "../../public/assets/hands.png";
import cover from "../../public/assets/t-rex.jpg";
import { useNavigate, useParams } from "react-router-dom";

interface IData {
  data: {
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
  };
}

const User = () => {
  const token = String(localStorage.getItem("token"));

  //Hooks
  const params = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState<IData>();

  useEffect(() => {
    if (token === "null") {
      return navigate("/");
    } else {
      const getData = async () => {
        const req = await fetch(`http://localhost:3333/user/${params.id}`, {
          method: "GET",
          headers: {
            Authorization: token,
          },
        });
        const res = await req.json();
        console.log(res?.data);
        setData(res?.data);
      };
      getData();
    }
  }, []);

  return (
    <Fragment>
      {token !== "null" && (
        <div className="user-container">
          <NavBar />
          <SideBar />
          <div className="user-posts-container">
            <img src={cover} alt="cover-image" className="cover" />
            <img src={profile} alt="profile-image" className="profile" />
            {/* @ts-ignore */}
            {data?.map((dt, i) => (
              <h2
                key={i}
                style={{
                  marginTop: 10,
                  fontSize: 26,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                {dt.username}
              </h2>
            ))}
            <div className="user-posts">
              {/* @ts-ignore */}
              {data?.map((dt, i) => {
                return <ListPost key={i} products={dt?.users_products} />;
              })}
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default User;
