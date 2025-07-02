import { Link, NavLink } from "react-router";
import RapidParcelLogo from "../RapidParcelLogo.jsx/RapidParcelLogo";
import useAuth from "../../../Hooks/useAuth";
const NavBar = () => {
  const { currentUser,logOut } = useAuth();
  const handleLogOut=()=>{
    logOut().then((res)=>{
      console.log(res);
    }).catch(error=>{
      console.log(error);
    })
  }
  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>

      <li>
        <NavLink to="/sendParcel">Send A Parcel</NavLink>
      </li>
      <li>
        <NavLink to="/coverage">Coverage</NavLink>
      </li>
      {currentUser && (
        <>
          <li>
            <NavLink to="/dashboard">Dashboard</NavLink>
          </li>
        </>
      )}
      <li>
        <NavLink to="/">about Us</NavLink>
      </li>
    </>
  );
  return (
    <div className="navbar bg-white rounded-lg my-4 shadow-sm">
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
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <RapidParcelLogo></RapidParcelLogo>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      <div className="navbar-end">
        {currentUser ? (
          <button onClick={handleLogOut} className="btn btn-primary">LogOut</button>
        ) : (
          <Link to="/login" className="btn btn-primary">
            LogIn
          </Link>
        )}
      </div>
    </div>
  );
};

export default NavBar;
