import {
  ChangeEvent,
  FC,
  FormEvent,
  Fragment,
  useEffect,
  useState,
} from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/EditPost.scss";

interface IUserState {
  name: string;
  price: number | string;
  description: string;
  category: string;
  picture: string;
  userId: string | undefined;
}

const EditPost: FC = () => {
  //Hooks
  const params = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState<IUserState>({
    name: "",
    price: "",
    description: "",
    category: "",
    picture: "",
    userId: "",
  });
  const [imag, setImag] = useState("");
  const [user, setUser] = useState();

  useEffect(() => {
    if (String(localStorage?.getItem("token")) == "null") {
      navigate("/");
    } else {
      async function getData() {
        const res = await fetch(`http://localhost:3333/product/${params.id}`, {
          method: "GET",
          headers: {
            Authorization: token,
          },
        });
        const data = await res.json();
        console.log(data);
        setUser(data?.id);
        setData(data?.data);
      }
      getData();
    }
  }, []);

  //Variables
  var token = String(localStorage?.getItem("token"));

  //Functions
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", data?.name);
    formData.append("price", String(data?.price));
    formData.append("description", data?.description);
    formData.append("category", data?.category);
    formData.append("picture", data?.picture);

    const req = await fetch(`http://localhost:3333/edit-product/${params.id}`, {
      method: "POST",
      headers: {
        Authorization: token,
      },
      body: formData,
    });

    const res = await req.json();

    navigate("/feed");
  };

  return (
    <Fragment>
      {token !== "null" && (
        <>
          {user == data?.userId ? (
            <div className="edit-post__container">
              <div className="logo-container">
                <h2>Kusumba</h2>
              </div>
              <form
                className="form"
                encType="multipart/form-data"
                onSubmit={handleSubmit}
              >
                <div className="left-side">
                  <label htmlFor="name">
                    Nome do producto
                    <input
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Digite aqui o nome do producto"
                      required
                      value={data?.name}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setData({ ...data, name: e.target.value })
                      }
                    />
                  </label>
                  <label htmlFor="price">
                    Preço do producto
                    <input
                      min={0}
                      type="number"
                      name="price"
                      id="price"
                      placeholder="Digite o preço do producto"
                      required
                      value={data?.price}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setData({ ...data, price: Number(e.target.value) })
                      }
                    />
                  </label>
                  <label htmlFor="description">
                    Descrição do producto
                    <textarea
                      name="description"
                      id="description"
                      placeholder="Dê uma breve descrição sobre o producto"
                      required
                      rows={7}
                      cols={17}
                      value={data?.description}
                      onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                        setData({ ...data, description: e.target.value })
                      }
                    ></textarea>
                  </label>
                </div>
                <div className="right-side">
                  <label htmlFor="category">
                    Categoria do producto
                    <input
                      type="text"
                      name="category"
                      id="category"
                      placeholder="Ex: Electrónico, Alimento, Roupa, etc..."
                      required
                      value={data?.category}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setData({ ...data, category: e.target.value })
                      }
                    />
                  </label>
                  <label htmlFor="picture" className="img-container">
                    {imag == "" ? (
                      "Clique para escolher a foto do producto"
                    ) : (
                      <img src={imag} alt="" className="img" />
                    )}
                    <input
                      className="input-file"
                      type="file"
                      name="picture"
                      id="picture"
                      required
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        console.log(e.target.files?.[0]);
                        //@ts-ignore
                        setData({ ...data, picture: e.target.files?.[0] });
                        //@ts-ignore
                        setImag(URL.createObjectURL(e.target.files?.[0]));
                      }}
                    />
                  </label>
                  <input type="submit" value="Actualizar" />
                </div>
              </form>
            </div>
          ) : (
            <h1 style={{ textAlign: "center" }}>
              Você não tem autorização para alterar este producto
            </h1>
          )}
        </>
      )}
    </Fragment>
  );
};

export default EditPost;
