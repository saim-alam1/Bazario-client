import { FiHeart } from "react-icons/fi";
import { IoCartOutline, IoSearchOutline } from "react-icons/io5";
import { NavLink } from "react-router";

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
      <FiHeart size={25} />
      <IoCartOutline size={25} />
      <a className="btn">Button</a>
    </>
  );

  return (
    <div>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <a className="btn btn-ghost text-xl">daisyUI</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>
        <div className="navbar-end flex items-center gap-3 mr-2">
          {/* Search Filed */}
          <div>
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
