import { useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import useUserRole from "../../../Hooks/useUserRole";
import { toast } from "react-toastify";
import Loading from "../../UI/Loading/Loading";
import { Link, NavLink, Outlet } from "react-router";
import useIsActive from "../../../Hooks/useIsActive";
import {
  FaBoxOpen,
  FaFlag,
  FaHistory,
  FaPlus,
  FaRegUser,
  FaShoppingCart,
  FaUserCheck,
  FaUsers,
  FaWallet,
} from "react-icons/fa";
import { PiPackageLight } from "react-icons/pi";
import { RiLayout3Line } from "react-icons/ri";
import { FiHeart } from "react-icons/fi";
import { FaBoxesPacking, FaRegStarHalfStroke } from "react-icons/fa6";
import {
  IoBagCheckOutline,
  IoBarChartSharp,
  IoStorefrontOutline,
} from "react-icons/io5";
import { LuBadgePercent } from "react-icons/lu";

const DashboardLayout = () => {
  const { user, logOutUser } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const { userRole, roleLoading } = useUserRole();

  const handleLogOut = () => {
    logOutUser()
      .then(() => {
        toast.success("Logged out successfully");
      })
      .catch((error) => {
        const errorMessage = error.message;
        toast.error(`${errorMessage}`);
      });
  };

  if (roleLoading) return <Loading />;

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="bg-white border-r border-gray-200 min-h-screen">
        <aside
          className={`
          fixed lg:static shrink-0 z-50 top-0 left-0 w-64 px-4 py-8 h-screen bg-white border-r border-gray-200 overflow-y-auto
          transform transition-transform duration-300 flex flex-col
          ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0
        `}
        >
          {/* Close Button for Mobile */}
          <div className="flex justify-end lg:hidden mb-4">
            <button onClick={() => setIsOpen(false)} className="text-[18px]">
              ✕
            </button>
          </div>

          {/* Logo */}
          <Link to="/" className="flex items-center justify-center gap-2 mb-6">
            <h4 className="text-xl text-amber-600 font-bold">Bazario</h4>
          </Link>

          {/* User Info */}
          <div className="flex flex-col items-center mb-6">
            <img
              referrerPolicy="no-referrer"
              src={user?.photoURL}
              alt={user?.displayName}
              className="w-24 h-24 rounded-full ring-2 ring-amber-500 p-1 object-cover"
            />
            <h4 className="mt-2.5 font-semibold text-headings text-lg">
              {user?.displayName}
            </h4>
            <p className="text-[16px] font-medium text-descriptions">
              {user?.email}
            </p>
          </div>

          {/* Navigation */}
          <nav className="flex flex-col gap-2">
            {/* Customer Route */}
            {userRole === "customer" && (
              <>
                <NavLink to="customer-profile" className={useIsActive}>
                  <FaRegUser style={{ marginRight: "8px" }} /> Profile
                </NavLink>
                <NavLink to="customer-overview" className={useIsActive}>
                  <RiLayout3Line style={{ marginRight: "8px" }} /> Overview
                </NavLink>
                <NavLink to="my-orders" className={useIsActive}>
                  <PiPackageLight style={{ marginRight: "8px" }} /> My Orders
                </NavLink>
                <NavLink to="wish-list" className={useIsActive}>
                  <FiHeart style={{ marginRight: "8px" }} /> Wishlist
                </NavLink>
                <NavLink to="my-cart" className={useIsActive}>
                  <FaShoppingCart style={{ marginRight: "8px" }} /> My Cart
                </NavLink>
                <NavLink to="my-reviews" className={useIsActive}>
                  <FaRegStarHalfStroke style={{ marginRight: "8px" }} /> My
                  Reviews
                </NavLink>
              </>
            )}

            {/* Vendor's Route */}
            {userRole === "vendor" && (
              <>
                <NavLink to="vendors-profile" className={useIsActive}>
                  <FaRegUser style={{ marginRight: "8px" }} /> Profile
                </NavLink>
                <NavLink to="vendors-overview" className={useIsActive}>
                  <RiLayout3Line style={{ marginRight: "8px" }} /> Overview
                </NavLink>

                <NavLink to="products" className={useIsActive}>
                  <PiPackageLight style={{ marginRight: "8px" }} /> Products
                </NavLink>
                <NavLink to="add-products" className={useIsActive}>
                  <FaPlus style={{ marginRight: "8px" }} /> Add Product
                </NavLink>
                <NavLink to="orders" className={useIsActive}>
                  <IoBagCheckOutline style={{ marginRight: "8px" }} /> Orders
                </NavLink>
                <NavLink to="inventory" className={useIsActive}>
                  <FaBoxesPacking style={{ marginRight: "8px" }} /> Inventory
                </NavLink>
                <NavLink to="discounts" className={useIsActive}>
                  <LuBadgePercent style={{ marginRight: "8px" }} /> Discounts
                </NavLink>
                <NavLink to="analytics" className={useIsActive}>
                  <IoBarChartSharp style={{ marginRight: "8px" }} /> Analytics
                </NavLink>
                <NavLink to="reviews" className={useIsActive}>
                  <FaRegStarHalfStroke style={{ marginRight: "8px" }} /> Reviews
                </NavLink>
                <NavLink to="payouts" className={useIsActive}>
                  <FaWallet style={{ marginRight: "8px" }} /> Payouts
                </NavLink>
                <NavLink to="withdrawal-history" className={useIsActive}>
                  <FaHistory style={{ marginRight: "8px" }} /> Withdrawals
                </NavLink>
              </>
            )}

            {/* Admin Route */}
            {userRole === "admin" && (
              <>
                <NavLink to="admin-profile" className={useIsActive}>
                  <FaRegUser style={{ marginRight: "8px" }} /> Profile
                </NavLink>
                <NavLink to="admin-overview" className={useIsActive}>
                  <RiLayout3Line style={{ marginRight: "8px" }} /> Overview
                </NavLink>
                <NavLink to="manage-users" className={useIsActive}>
                  <FaUsers style={{ marginRight: "8px" }} /> Manage Users
                </NavLink>
                <NavLink to="manage-vendors" className={useIsActive}>
                  <IoStorefrontOutline style={{ marginRight: "8px" }} /> Manage
                  Vendors
                </NavLink>
                <NavLink to="vendor-approval" className={useIsActive}>
                  <FaUserCheck style={{ marginRight: "8px" }} /> Vendor Approval
                </NavLink>
                <NavLink to="manage-products" className={useIsActive}>
                  <FaBoxOpen style={{ marginRight: "8px" }} /> Products
                </NavLink>
                <NavLink to="admin-analytics" className={useIsActive}>
                  <IoBarChartSharp style={{ marginRight: "8px" }} /> Analytics
                </NavLink>
                <NavLink to="admin-payouts" className={useIsActive}>
                  <FaWallet style={{ marginRight: "8px" }} /> Payouts
                </NavLink>
                <NavLink to="reports" className={useIsActive}>
                  <FaFlag style={{ marginRight: "8px" }} /> Reports
                </NavLink>
              </>
            )}
          </nav>

          <div className="flex items-end justify-center h-full">
            <span className="border-t border-[#6b7280] w-full">
              <button
                onClick={handleLogOut}
                className="btn text-lg bg-red-500 hover:bg-red-600 transition-colors duration-200 text-white border-none w-full my-1.5"
              >
                Logout
              </button>
            </span>
          </div>
        </aside>
      </div>

      {/* Main Content */}
      <div className="flex-1 min-h-screen flex flex-col">
        {/* Mobile toggle button */}
        <div className="lg:hidden p-4 bg-white shadow flex justify-between items-center">
          <button onClick={() => setIsOpen(true)} className="text-[18px]">
            ☰
          </button>
        </div>

        <div className="grow lg:px-3">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
