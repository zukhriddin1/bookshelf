import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Bookshelf from "./components/bookshelf/Bookshelf";
import Login from "./components/LogReg/LoginAntd";
import RegisterPage from "./components/LogReg/RegAnt";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Bookshelf></Bookshelf>,
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/register",
    element: <RegisterPage></RegisterPage>,
  },
]);

const App = () => {
  return <RouterProvider router={router}></RouterProvider>;
};

export default App;
