import { FC, Fragment } from "react";
import { Link } from "react-router-dom";
import "./ListPost.scss";

interface IProps {
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

const ListPost: FC<IProps> = ({ products }) => {
  return (
    <Fragment>
      {products?.map((p, i) => {
        return (
          <div className="post-container" key={i}>
            <img src={p?.picture} alt="post-image" />
            <Link to={`/product/${p.id}`}>Ver Mais...</Link>
          </div>
        );
      })}
    </Fragment>
  );
};

export default ListPost;
