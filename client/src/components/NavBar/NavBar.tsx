import { ChangeEvent, FormEvent, Fragment, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./NavBar.scss";

function NavBar() {
  //Hooks
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  //Variables

  //Functions
  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();

    const res = await fetch("http://localhost:3333/search", {
      method: "POST",
      body: JSON.stringify({ search }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    console.log(data);
  };

  const handleLogOut = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <Fragment>
      {isOpen && (
        <section className="navbar-animated">
          <div>
            <span onClick={() => setIsOpen((prev) => !prev)}>&times;</span>
          </div>
          <h1>
            <Link to="/feed">Feed</Link>
            <br />
            <Link to="/profile">Meu Perfil</Link>
            <br />
            <Link to="#">Definições</Link>
            <br />
            <Link to="#">Políticas de Privacidade</Link>
            <br />
            <Link to="#">Mais...</Link>
            <br />
            <a onClick={handleLogOut}>Sair</a>
            <br />
          </h1>
        </section>
      )}

      <section className="navbar-container">
        <div className="logo">
          <Link to={"/feed"}>Kusumba</Link>
        </div>
        <form onSubmit={handleSearch}>
          <input
            type="search"
            name="search"
            value={search}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSearch(e.target?.value)
            }
            required
            placeholder="Pesquise por Vendedores e Productos"
          />

          <input type="submit" value={"Pesquise"} />
        </form>

        <button type="button" onClick={() => setIsOpen((prev) => !prev)}>
          openNav
        </button>
      </section>
    </Fragment>
  );
}

export default NavBar;
