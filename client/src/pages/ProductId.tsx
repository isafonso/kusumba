import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/ProductId.scss";

interface IData {
  id: number;
  name: string;
  description: string;
  category: string;
  picture: string;
  price: number;
  userId: number;
  users_products: {
    id: number;
    username: string;
    password: string;
    email: string;
  };
}

const ProductId = () => {
  const token = String(localStorage.getItem("token"));

  //Hooks
  const params = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState<IData>();
  const [user, setUser] = useState();

  useEffect(() => {
    if (token === "null") {
      return navigate("/");
    } else {
      const getData = async () => {
        const req = await fetch(`http://localhost:3333/product/${params.id}`, {
          method: "GET",
          headers: {
            Authorization: token,
          },
        });
        const res = await req.json();
        console.log(res);
        console.log(res?.data);
        setUser(res?.id);
        setData(res?.data);
      };
      getData();
    }
  }, []);

  return (
    <Fragment>
      {token !== "null" && (
        <div className="product-container">
          <h1>Kusumba</h1>
          <div className="wrapper">
            <div className="img-container">
              <img src={data?.picture} alt="img-product" />
            </div>
            <div className="info">
              <h3>
                Nome do producto: <em>{data?.name}</em>
              </h3>
              <h3>
                Preço do producto: <em>{data?.price} KZ</em>
              </h3>
              <h3>
                Descrição: <em>{data?.description}</em>
              </h3>
              <h3>
                Categoria: <em>{data?.category}</em>
              </h3>
              <h3>
                Vendedor: <em>{data?.users_products?.username}</em>
              </h3>
              <h3>
                Contacto do Vendedor:{" "}
                <a href={"mailto:" + data?.users_products?.email}>
                  {data?.users_products?.email}
                </a>
              </h3>
              {user == data?.userId && (
                <div className="links">
                  <Link to={`/edit-product/${params.id}`}>Editar Producto</Link>
                  <Link to={``} className="second-link">
                    Eliminar Producto
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default ProductId;
