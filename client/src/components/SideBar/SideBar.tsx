import React, { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SideBar.scss";

const SideBar = () => {
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.clear();
    navigate("/");
  };
  return (
    <Fragment>
      <div className="sideBar-container">
        <ul className="links">
          <li>
            <Link to="/profile">Meu Perfil</Link>
          </li>
          <li>
            <Link to="#">Definições</Link>
          </li>
          <li>
            <Link to="#">Políticas de Privacidade</Link>
          </li>
          <li>
            <Link to="#">Mais...</Link>
          </li>
          <li>
            <a onClick={handleLogOut}>Sair</a>
          </li>
        </ul>
      </div>
    </Fragment>
  );
};

export default SideBar;
