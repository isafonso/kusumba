import { FC, Fragment } from "react";
import { Link } from "react-router-dom";
import "./CardPost.scss";

interface IProps {
  id: number;
  username: string;
  email: string;
  products: [
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

const CardPost: FC<IProps> = ({ products, email, id, username }) => {
  return (
    <Fragment>
      {products?.map((product, i) => {
        return (
          <div className="cardPost-container" key={i}>
            <Link to={`/user/${id}`} className="user-info">
              <img src="" alt="userImg" />
              <span className="username">{username}</span>
            </Link>
            <div className="desc">
              <p>{product?.description}</p>
            </div>
            <img src={product?.picture} alt="photoUploaded" loading="eager" />
            <div className="feedback">
              <a href={`mailto:${email}`}>Entrar em contacto</a>
            </div>
          </div>
        );
      })}
    </Fragment>
  );
};

export default CardPost;
