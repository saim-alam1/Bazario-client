import { createBrowserRouter } from "react-router";
import HomeLayout from "../Layouts/HomeLayout/HomeLayout";
import Home from "../Pages/Home/Home";
import Shop from "../Pages/Shop/Shop";
import Categories from "../Pages/Categories/Categories";
import BecomeASeller from "../Pages/BecomeASeller/BecomeASeller";
import About from "../Pages/About/About";
import WishList from "../Pages/WishList/WishList";
import CartItems from "../Pages/CartItems/CartItems";
import AuthLayout from "../Layouts/AuthLayout/AuthLayout";
import Login from "../Pages/Login/Login";
import ErrorComponent from "../UI/ErrorComponent/ErrorComponent";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorComponent />,
    element: <HomeLayout />,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/shop",
        Component: Shop,
      },
      {
        path: "/categories",
        Component: Categories,
      },
      {
        path: "/become-a-seller",
        Component: BecomeASeller,
      },
      {
        path: "/about",
        Component: About,
      },
      {
        path: "/wish-list",
        Component: WishList,
      },
      {
        path: "/cart-items",
        Component: CartItems,
      },
    ],
  },
  {
    path: "/auth-layout",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        Component: Login,
      },
    ],
  },
]);

export default router;
