import { createBrowserRouter } from "react-router";
import HomeLayout from "../Layouts/HomeLayout/HomeLayout";
import Home from "../Pages/Home/Home";
import Shop from "../Pages/Shop/Shop";
import Categories from "../Pages/Categories/Categories";
import BecomeASeller from "../Pages/BecomeASeller/BecomeASeller";
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
import Products from "../Pages/Vendor/Products/Products";
import AddProducts from "../Pages/Vendor/AddProducts/AddProducts";
import Orders from "../Pages/Vendor/Orders/Orders";
import Inventory from "../Pages/Vendor/Inventory/Inventory";
import Discounts from "../Pages/Vendor/Discounts/Discounts";
import Analytics from "../Pages/Vendor/Analytics/Analytics";
import Reviews from "../Pages/Vendor/Reviews/Reviews";
import Payouts from "../Pages/Vendor/Payouts/Payouts";
import AdminOverview from "../Pages/Admin/AdminOverview/AdminOverview";
import ManageUsers from "../Pages/Admin/ManageUsers/ManageUsers";
import ManageVendors from "../Pages/Admin/ManageVendors/ManageVendors";
import VendorApproval from "../Pages/Admin/VendorApproval/VendorApproval";
import ManageProducts from "../Pages/Admin/ManageProducts/ManageProducts";
import AdminAnalytics from "../Pages/Admin/AdminAnalytics/AdminAnalytics";
import PayoutsSection from "../Pages/Admin/PayoutsSection/PayoutsSection";
import Reports from "../Pages/Admin/Reports/Reports";
import ForbiddenAccess from "../UI/ForbiddenAccess/ForbiddenAccess";
import CustomerRoute from "../Pages/Auth/CustomerRoute/CustomerRoute";
import VendorsRoute from "../Pages/Auth/VendorsRoute/VendorsRoute";
import ProductsSection from "../Pages/Customer/ProductsSection/ProductsSection";
import ProductsDetails from "../Pages/ProductsDetails/ProductsDetails";
import BuyProduct from "../Pages/Customer/BuyProduct/BuyProduct";
import AdminRoute from "../Pages/Auth/AdminRoute/AdminRoute";
import VendorsWithdrawHistory from "../Pages/Vendor/VendorsWithdrawHistory/VendorsWithdrawHistory";

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
          <CustomerRoute>
            <BecomeASeller />
          </CustomerRoute>
        ),
      },
      {
        path: "/products-section",
        Component: ProductsSection,
      },
      {
        path: "/products-details/:id",
        Component: ProductsDetails,
      },
      {
        path: "buy-product/:id",
        element: (
          <CustomerRoute>
            <BuyProduct />
          </CustomerRoute>
        ),
      },
      {
        path: "/forbidden-access",
        Component: ForbiddenAccess,
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
        element: (
          <CustomerRoute>
            <CustomerProfile />
          </CustomerRoute>
        ),
      },
      {
        path: "customer-overview",
        element: (
          <CustomerRoute>
            <CustomerOverview />
          </CustomerRoute>
        ),
      },
      {
        path: "my-orders",
        element: (
          <CustomerRoute>
            <MyOrders />
          </CustomerRoute>
        ),
      },
      {
        path: "wish-list",
        element: (
          <CustomerRoute>
            <WishList />
          </CustomerRoute>
        ),
      },
      {
        path: "my-cart",
        element: (
          <CustomerRoute>
            <MyCart />
          </CustomerRoute>
        ),
      },
      {
        path: "my-reviews",
        element: (
          <CustomerRoute>
            <MyReviews />
          </CustomerRoute>
        ),
      },
      // Vendors Routes
      {
        path: "vendors-profile",
        element: (
          <VendorsRoute>
            <VendorsProfile />
          </VendorsRoute>
        ),
      },
      {
        path: "vendors-overview",
        Component: VendorsOverview,
      },
      {
        path: "products",
        element: (
          <VendorsRoute>
            <Products />
          </VendorsRoute>
        ),
      },
      {
        path: "add-products",
        element: (
          <VendorsRoute>
            <AddProducts />
          </VendorsRoute>
        ),
      },
      {
        path: "orders",
        element: (
          <VendorsRoute>
            <Orders />
          </VendorsRoute>
        ),
      },
      {
        path: "inventory",
        element: (
          <VendorsRoute>
            <Inventory />
          </VendorsRoute>
        ),
      },
      {
        path: "discounts",
        element: (
          <VendorsRoute>
            <Discounts />
          </VendorsRoute>
        ),
      },
      {
        path: "analytics",
        element: (
          <VendorsRoute>
            <Analytics />
          </VendorsRoute>
        ),
      },
      {
        path: "reviews",
        element: (
          <VendorsRoute>
            <Reviews />
          </VendorsRoute>
        ),
      },
      {
        path: "payouts",
        element: (
          <VendorsRoute>
            <Payouts />
          </VendorsRoute>
        ),
      },
      {
        path: "withdrawal-history",
        element: (
          <VendorsRoute>
            <VendorsWithdrawHistory />
          </VendorsRoute>
        ),
      },
      // Admin Routes
      {
        path: "admin-profile",
        element: (
          <AdminRoute>
            <AdminProfile />
          </AdminRoute>
        ),
      },
      {
        path: "admin-overview",
        element: (
          <AdminRoute>
            <AdminOverview />
          </AdminRoute>
        ),
      },
      {
        path: "manage-users",
        element: (
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        ),
      },
      {
        path: "manage-vendors",
        element: (
          <AdminRoute>
            <ManageVendors />
          </AdminRoute>
        ),
      },
      {
        path: "vendor-approval",
        element: (
          <AdminRoute>
            <VendorApproval />
          </AdminRoute>
        ),
      },
      {
        path: "manage-products",
        element: (
          <AdminRoute>
            <ManageProducts />
          </AdminRoute>
        ),
      },
      {
        path: "admin-analytics",
        element: (
          <AdminRoute>
            <AdminAnalytics />
          </AdminRoute>
        ),
      },
      {
        path: "admin-payouts",
        element: (
          <AdminRoute>
            <PayoutsSection />
          </AdminRoute>
        ),
      },
      {
        path: "reports",
        element: (
          <AdminRoute>
            <Reports />
          </AdminRoute>
        ),
      },
    ],
  },
]);

export default router;
