import Footer from "../../Pages/Footer/Footer";
import Navbar from "../../Pages/Navbar/Navbar";
import { Outlet } from "react-router";

const HomeLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="max-w-480 mx-auto grow w-full">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default HomeLayout;
