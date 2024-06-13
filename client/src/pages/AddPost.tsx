import {
  ChangeEvent,
  FC,
  FormEvent,
  Fragment,
  useEffect,
  useState,
} from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/AddPost.scss";

interface IUserState {
  name: string;
  price: number | string;
  description: string;
  category: string;
  picture: string;
  userId: string | undefined;
}

const AddPost: FC = () => {
  //Hooks
  const params = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<IUserState>({
    name: "",
    price: "",
    description: "",
    category: "",
    picture: "",
    userId: "",
  });
  const [imag, setImag] = useState("");

  useEffect(() => {
    if (String(localStorage?.getItem("token")) == "null") {
      navigate("/");
    }
  }, []);

  //Variables
  var token = String(localStorage?.getItem("token"));

  //Functions
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const dataForm = new FormData();
    dataForm.append("name", formData.name);
    dataForm.append("price", String(formData.price));
    dataForm.append("description", formData.description);
    dataForm.append("category", formData.category);
    dataForm.append("picture", formData.picture);

    const res = await fetch("http://localhost:3333/addPost", {
      method: "POST",
      headers: {
        Authorization: token,
      },
      body: dataForm,
    });

    const data = await res.json();

    navigate("/feed");
  };

  return (
    <Fragment>
      {token !== "null" && (
        <div className="add-post__container">
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
                  value={formData.name}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setFormData({ ...formData, name: e.target.value })
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
                  value={formData.price}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setFormData({ ...formData, price: Number(e.target.value) })
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
                  value={formData.description}
                  onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                    setFormData({ ...formData, description: e.target.value })
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
                  value={formData.category}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setFormData({ ...formData, category: e.target.value })
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
                    setFormData({ ...formData, picture: e.target.files?.[0] });
                    //@ts-ignore
                    setImag(URL.createObjectURL(e.target.files?.[0]));
                  }}
                />
              </label>
              <input type="submit" value="Publicar" />
            </div>
          </form>
        </div>
      )}
    </Fragment>
  );
};

export default AddPost;
