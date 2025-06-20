import { Link } from "react-router";
import logo from "../../../assets/logo.png";

const RapidParcelLogo = () => {
  return (
    <Link to="/">
      <div className="flex items-end">
        <img className="mb-2" src={logo} alt="" />
        <p className="-ml-2.5 text-3xl font-extrabold">RapidParcel</p>
      </div>
    </Link>
  );
};

export default RapidParcelLogo;
