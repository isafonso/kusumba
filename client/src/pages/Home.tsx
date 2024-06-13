import { FC, Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/Home.scss";

const Home: FC = () => {
  useEffect(() => {
    localStorage.clear();
  }, []);

  return (
    <Fragment>
      <div className="home__container">
        <section className="top">
          <span className="info">
            A Kusumba é uma plataforma web para compra e venda de productos
            diversos.
          </span>
        </section>
        <section className="bottom">
          <img src="" alt="" />
          <div>
            <Link to={"register"}>Cadastrar</Link>
            <Link to={"login"}>Entrar</Link>
          </div>
        </section>
      </div>
    </Fragment>
  );
};

export default Home;
