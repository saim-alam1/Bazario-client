import { useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import useUserRole from "../../../Hooks/useUserRole";
import { toast } from "react-toastify";
import Loading from "../../UI/Loading/Loading";
import { Link, NavLink, Outlet } from "react-router";
import useIsActive from "../../../Hooks/useIsActive";
import {
  FaBriefcase,
  FaEnvelopeOpenText,
  FaFileAlt,
  FaRegClipboard,
  FaRegUser,
  FaUserCheck,
  FaUsers,
  FaUserTie,
} from "react-icons/fa";

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
            {/* <img src={logo} alt="Logo" className="h-6" /> */}
            <h4 className="text-xl text-headings font-bold">
              Next<span className="color-primary">Hire</span>
            </h4>
          </Link>

          {/* User Info */}
          <div className="flex flex-col items-center mb-6">
            <img
              referrerPolicy="no-referrer"
              src={user?.photoURL}
              alt={user?.displayName}
              className="w-24 h-24 rounded-full ring-2 ring-blue-500 p-1 object-cover"
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
                <NavLink to="employer-profile" className={useIsActive}>
                  <FaRegUser style={{ marginRight: "8px" }} /> Profile
                </NavLink>
                <NavLink to="posted-jobs" className={useIsActive}>
                  <FaBriefcase style={{ marginRight: "8px" }} /> Posted Jobs
                </NavLink>
                <NavLink to="candidates" className={useIsActive}>
                  <FaUsers style={{ marginRight: "8px" }} /> Candidates
                </NavLink>
                <NavLink to="interview-list" className={useIsActive}>
                  <FaUserTie style={{ marginRight: "8px" }} /> Interview List
                </NavLink>
                <NavLink to="hired-candidates" className={useIsActive}>
                  <FaUserCheck style={{ marginRight: "8px" }} /> Hired
                  Candidates
                </NavLink>
              </>
            )}

            {/* Vendor's Route */}
            {userRole === "vendor" && (
              <>
                <NavLink
                  to="/dashboard/job-seeker-profile"
                  className={useIsActive}
                >
                  <FaRegUser style={{ marginRight: "8px" }} /> Profile
                </NavLink>
                <NavLink to="/dashboard/applied-jobs" className={useIsActive}>
                  <FaRegClipboard style={{ marginRight: "8px" }} /> Applied Jobs
                </NavLink>
                <NavLink to="/dashboard/opportunities" className={useIsActive}>
                  <FaEnvelopeOpenText style={{ marginRight: "8px" }} />{" "}
                  Opportunities
                </NavLink>
                <NavLink to="/dashboard/upload-resume" className={useIsActive}>
                  <FaFileAlt style={{ marginRight: "8px" }} /> Upload Resume
                </NavLink>
                <NavLink to="/dashboard/interview-data" className={useIsActive}>
                  <FaUserTie style={{ marginRight: "8px" }} /> Interviews
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
