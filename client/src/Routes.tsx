import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  AddPost,
  EditPost,
  Feed,
  Home,
  Login,
  ProductId,
  Profile,
  Register,
  User,
} from "./pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },

  {
    path: "/feed",
    element: <Feed />,
  },
  {
    path: "/addPost",
    element: <AddPost />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/user/:id",
    element: <User />,
  },
  {
    path: "/product/:id",
    element: <ProductId />,
  },
  {
    path: "/edit-product/:id",
    element: <EditPost />,
  },
]);

export default function Routes() {
  return <RouterProvider router={router}></RouterProvider>;
}
