import { FiHeart } from "react-icons/fi";
import { IoCartOutline, IoSearchOutline } from "react-icons/io5";
import { RiMenu2Fill } from "react-icons/ri";
import { Link, NavLink } from "react-router";

const Navbar = () => {
  const links = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `${isActive ? "text-[#EA580C] border-b border-[#EA580C]" : "text-[#6B7280]"} font-semibold text-base`
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/shop"
          className={({ isActive }) =>
            `${isActive ? "text-[#EA580C] border-b border-[#EA580C]" : "text-[#6B7280]"} font-semibold text-base`
          }
        >
          Shop
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/categories"
          className={({ isActive }) =>
            `${isActive ? "text-[#EA580C] border-b border-[#EA580C]" : "text-[#6B7280]"} font-semibold text-base`
          }
        >
          Categories
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/become-a-seller"
          className={({ isActive }) =>
            `${isActive ? "text-[#EA580C] border-b border-[#EA580C]" : "text-[#6B7280]"} font-semibold text-base`
          }
        >
          Become a Seller
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            `${isActive ? "text-[#EA580C] border-b border-[#EA580C]" : "text-[#6B7280]"} font-semibold text-base`
          }
        >
          About
        </NavLink>
      </li>
    </>
  );

  const authLinks = (
    <>
      <NavLink
        to="/wish-list"
        className={({ isActive }) =>
          `${isActive ? "text-[#EA580C] border-b pb-1 border-[#EA580C]" : "text-[#6B7280]"} font-semibold text-base`
        }
      >
        <FiHeart size={25} />
      </NavLink>

      <NavLink
        to="/cart-items"
        className={({ isActive }) =>
          `${isActive ? "text-[#EA580C] border-b pb-1 border-[#EA580C]" : "text-[#6B7280]"} font-semibold text-base`
        }
      >
        <IoCartOutline size={25} />
      </NavLink>

      <Link
        to="/auth-layout/login"
        className="btn border-none shadow-none bg-[#F59E0B] hover:bg-[#D97706] text-white font-semibold text-base"
      >
        Login
      </Link>
    </>
  );

  return (
    <div>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <RiMenu2Fill size={25} />
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <Link to="/" className="btn btn-ghost text-xl">
            Bazario
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>
        <div className="navbar-end flex items-center gap-3 mr-2">
          {/* Search Filed */}
          <div className="hidden md:flex">
            <label className="input">
              <IoSearchOutline size={25} />
              <input type="search" required placeholder="Search" />
            </label>
          </div>
          {authLinks}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
