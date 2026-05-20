import { createBrowserRouter } from "react-router";
import HomeLayout from "../Layouts/HomeLayout/HomeLayout";
import Home from "../Pages/Home/Home";
import Shop from "../Pages/Shop/Shop";
import Categories from "../Pages/Categories/Categories";
import BecomeASeller from "../Pages/BecomeASeller/BecomeASeller";
import About from "../Pages/About/About";
import AuthLayout from "../Layouts/AuthLayout/AuthLayout";
import ErrorComponent from "../UI/ErrorComponent/ErrorComponent";
import Register from "../Pages/Auth/Register/Register";
import Login from "../Pages/Auth/Login/Login";
import PrivateRoute from "../Pages/Auth/Private/PrivateRoute";
import DashboardLayout from "../Layouts/DashboardLayout/DashboardLayout";
import DashboardRedirects from "../Utils/DashboardRedirects/DashboardRedirects";
import AdminProfile from "../Pages/Admin/AdminProfile/AdminProfile";
import CustomerProfile from "../Pages/Customer/CustomerProfile/CustomerProfile";
import CustomerOverview from "../Pages/Customer/CustomerOverview/CustomerOverview";
import MyOrders from "../Pages/Customer/MyOrders/MyOrders";
import WishList from "../Pages/Customer/WishList/WishList";
import MyCart from "../Pages/Customer/MyCart/MyCart";
import MyReviews from "../Pages/Customer/MyReviews/MyReviews";
import VendorsProfile from "../Pages/Vendor/VendorsProfile/VendorsProfile";
import VendorsOverview from "../Pages/Vendor/VendorsOverview/VendorsOverview";
import MyStore from "../Pages/Vendor/MyStore/MyStore";
import Products from "../Pages/Vendor/Products/Products";
import AddProducts from "../Pages/Vendor/AddProducts/AddProducts";
import Orders from "../Pages/Vendor/Orders/Orders";
import Inventory from "../Pages/Vendor/Inventory/Inventory";
import Discounts from "../Pages/Vendor/Discounts/Discounts";
import Analytics from "../Pages/Vendor/Analytics/Analytics";
import Reviews from "../Pages/Vendor/Reviews/Reviews";
import Payouts from "../Pages/Vendor/Payouts/Payouts";

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
        element: (
          <PrivateRoute>
            <BecomeASeller />
          </PrivateRoute>
        ),
      },
      {
        path: "/about",
        Component: About,
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
      {
        path: "register",
        Component: Register,
      },
    ],
  },
  {
    path: "/dashboard-layout",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <DashboardRedirects />,
      },
      // Customer Routes
      {
        path: "customer-profile",
        Component: CustomerProfile,
      },
      {
        path: "customer-overview",
        Component: CustomerOverview,
      },
      {
        path: "my-orders",
        Component: MyOrders,
      },
      {
        path: "wish-list",
        Component: WishList,
      },
      {
        path: "my-cart",
        Component: MyCart,
      },
      {
        path: "my-reviews",
        Component: MyReviews,
      },
      // Vendors Routes
      {
        path: "vendors-profile",
        Component: VendorsProfile,
      },
      {
        path: "vendors-overview",
        Component: VendorsOverview,
      },
      {
        path: "my-store",
        Component: MyStore,
      },
      {
        path: "products",
        Component: Products,
      },
      {
        path: "add-products",
        Component: AddProducts,
      },
      {
        path: "orders",
        Component: Orders,
      },
      {
        path: "inventory",
        Component: Inventory,
      },
      {
        path: "discounts",
        Component: Discounts,
      },
      {
        path: "analytics",
        Component: Analytics,
      },
      {
        path: "reviews",
        Component: Reviews,
      },
      {
        path: "payouts",
        Component: Payouts,
      },
      // Admin Routes
      {
        path: "admin-profile",
        Component: AdminProfile,
      },
    ],
  },
]);

export default router;
