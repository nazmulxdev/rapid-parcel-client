import { Outlet } from "react-router";
import authImg from "../assets/authImage.png";
const AuthLayout = () => {
  return (
    <div>
      <div className="flex flex-col lg:flex-row-reverse">
        <div className="flex-1 flex justify-center bg-[#FAFDF0] items-center">
          <img src={authImg} />
        </div>
        <div className="flex-1">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
