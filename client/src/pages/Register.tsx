import { FC, FormEvent, Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Register.scss";

interface IUserState {
  username: string;
  email: string;
  password: string;
}

const Register: FC = () => {
  const [formData, setFormData] = useState<IUserState>({
    username: "",
    email: "",
    password: "",
  });

  const [data, setData] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.clear();
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const res = await fetch("http://localhost:3333/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    localStorage.setItem("token", String(data?.token));

    if (data?.token) {
      localStorage.setItem("token", String(data?.token));
      navigate("/feed");
    } else {
      setData(data?.error);
    }
  };
  return (
    <Fragment>
      <div className="register__container">
        <div className="logo-container">
          <h2>Kusumba</h2>
        </div>
        <form className="form" onSubmit={handleSubmit}>
          <label htmlFor="username">
            Username
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Crie seu nome de usuário"
              required
              value={formData.username}
              onChange={(e: FormEvent) =>
                //@ts-ignore
                setFormData({ ...formData, username: e.target.value })
              }
            />
          </label>
          <label htmlFor="email">
            E-Mail
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Digite seu E-Mail"
              required
              value={formData.email}
              onChange={(e: FormEvent) =>
                //@ts-ignore
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </label>
          <label htmlFor="password">
            Senha
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Crie sua senha"
              required
              value={formData.password}
              onChange={(e: FormEvent) =>
                //@ts-ignore
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </label>
          <input type="submit" value="Cadastrar" />
        </form>
      </div>
    </Fragment>
  );
};

export default Register;
