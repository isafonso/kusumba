import { FC, FormEvent, Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.scss";

interface IUserState {
  username?: string;
  email: string;
  password: string;
  type?: string;
}

const Login: FC = () => {
  const [formData, setFormData] = useState<IUserState>({
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

    const res = await fetch("http://localhost:3333/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (data?.token) {
      localStorage.setItem("token", String(data?.token));
      navigate("/feed");
    } else {
      setData(data?.error);
    }
  };
  return (
    <Fragment>
      <div className="login__container">
        <div className="logo-container">
          <h2>Kusumba</h2>
        </div>
        <form className="form" onSubmit={handleSubmit}>
          <label htmlFor="email">
            Email
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Digite seu email"
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
              placeholder="Digite sua senha"
              required
              value={formData.password}
              onChange={(e: FormEvent) =>
                //@ts-ignore
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </label>
          {data && <span style={{ color: "red", fontSize: 17 }}>{data}</span>}
          <input type="submit" value="Entrar" />
        </form>
      </div>
    </Fragment>
  );
};

export default Login;
