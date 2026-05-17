import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="max-w-480 mx-auto grow w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
