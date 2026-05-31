import { FiHeart } from "react-icons/fi";
import { IoCartOutline } from "react-icons/io5";
import { RiMenu2Fill } from "react-icons/ri";
import { SiShopify } from "react-icons/si";
import { Link, NavLink } from "react-router";
import useAuth from "../../../Hooks/useAuth";
import { toast } from "react-toastify";
import useUserRole from "../../../Hooks/useUserRole";
import Notifications from "../../UI/Notifications/Notifications";
import useLocalStorage from "../../../Hooks/useLocalStorage";

const Navbar = () => {
  const { user, logOutUser } = useAuth();
  const { userRole } = useUserRole();
  const { getItems: getCartItems } = useLocalStorage("cart-items");
  const { getItems: getWishlistItems } = useLocalStorage("wishlist-items");

  const cartItemsCount = getCartItems().length;
  const wishlistItemsCount = getWishlistItems().length;

  console.log(userRole);

  // Logout
  const handleLogout = () => {
    logOutUser()
      .then(() => toast.success("Logout successfully"))
      .catch((error) => {
        const errorMessage = error.message;
        toast.error(`${errorMessage}`);
      });
  };

  const links = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `${isActive ? "text-[#EA580C] border-b pb-1 border-[#EA580C]" : "text-[#6B7280]"} font-semibold text-base`
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/shop"
          className={({ isActive }) =>
            `${isActive ? "text-[#EA580C] border-b pb-1 border-[#EA580C]" : "text-[#6B7280]"} font-semibold text-base`
          }
        >
          Shop
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/categories"
          className={({ isActive }) =>
            `${isActive ? "text-[#EA580C] border-b pb-1 border-[#EA580C]" : "text-[#6B7280]"} font-semibold text-base`
          }
        >
          Categories
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/products-section"
          className={({ isActive }) =>
            `${isActive ? "text-[#EA580C] border-b pb-1 border-[#EA580C]" : "text-[#6B7280]"} font-semibold text-base`
          }
        >
          Products
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/become-a-seller"
          className={({ isActive }) =>
            `${isActive ? "text-[#EA580C] border-b pb-1 border-[#EA580C]" : "text-[#6B7280]"} font-semibold text-base`
          }
        >
          Become a Seller
        </NavLink>
      </li>
    </>
  );

  const authLinks = user ? (
    <div className="flex items-center gap-2.5">
      <NavLink
        to="/dashboard-layout/wish-list"
        className={({ isActive }) =>
          `${isActive ? "text-[#EA580C] border-b pb-1 border-[#EA580C]" : "text-[#6B7280]"} font-semibold text-base`
        }
      >
        <button
          tabIndex={0}
          role="button"
          className="btn btn-ghost btn-circle relative z-50"
        >
          <div className="indicator">
            <FiHeart className="text-2xl" />

            <span className="badge badge-sm bg-amber-600 border-none text-white indicator-item">
              {wishlistItemsCount}
            </span>
          </div>
        </button>
      </NavLink>

      <NavLink
        to="/dashboard-layout/my-cart"
        className={({ isActive }) =>
          `${isActive ? "text-[#EA580C] border-b pb-1 border-[#EA580C]" : "text-[#6B7280]"} font-semibold text-base`
        }
      >
        <button
          tabIndex={0}
          role="button"
          className="btn btn-ghost btn-circle relative z-50"
        >
          <div className="indicator">
            <IoCartOutline className="text-3xl" />

            <span className="badge badge-sm bg-amber-600 border-none text-white indicator-item">
              {cartItemsCount}
            </span>
          </div>
        </button>
      </NavLink>

      {/* Profile Dropdown */}
      <div className="dropdown dropdown-end z-50">
        <div
          tabIndex={0}
          role="button"
          className="avatar cursor-pointer hover:opacity-80 transition"
        >
          <div className="ring-2 ring-amber-600 ring-offset-1 ring-offset-amber-600 w-12 rounded-full">
            <img
              referrerPolicy="no-referrer"
              src={`${user?.photoURL}`}
              alt="User Profile"
            />
          </div>
        </div>

        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content mt-3 z-1 p-2 shadow bg-base-100 rounded-box w-52 border border-gray-100"
        >
          <li className="px-4 py-2 font-semibold text-[17px] text-amber-600 border-b mb-1">
            {user?.displayName || "User"}
          </li>
          <li>
            <Link to="/dashboard-layout" className="py-3 text-[16px]">
              Dashboard
            </Link>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className="py-3 text-[16px] text-red-500 font-medium"
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  ) : (
    <Link
      to="/auth-layout/login"
      className="btn border-none shadow-none bg-amber-500 hover:bg-amber-600 text-white font-semibold text-base"
    >
      Login
    </Link>
  );

  return (
    <div className="bg-base-100 shadow-sm">
      <div className="navbar max-w-480 mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <RiMenu2Fill size={25} className="text-amber-500" />
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <Link
            to="/"
            className="btn btn-ghost text-amber-600 text-xl font-semibold border-none shadow-none bg-transparent"
          >
            <SiShopify size={25} />
            Bazario
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>
        <div className="navbar-end flex items-center gap-3 mr-2">
          {/* Notifications */}
          <Notifications />
          {authLinks}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
