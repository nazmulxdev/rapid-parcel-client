import React from "react";
import { NavLink, Outlet } from "react-router";
import RapidParcelLogo from "../Pages/Shared/RapidParcelLogo.jsx/RapidParcelLogo";
import {
  FaHome,
  FaBox,
  FaCreditCard,
  FaMapMarkedAlt,
  FaUserEdit,
} from "react-icons/fa";

const DashBoardLayOut = () => {
  return (
    <div className="drawer md:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content flex flex-col">
        {/* Mobile Navbar */}
        <div className="navbar bg-base-300 w-full md:hidden">
          <div className="flex-none lg:hidden">
            <label
              htmlFor="my-drawer-2"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="mx-2 flex-1 px-2 text-lg font-semibold">
            Dashboard
          </div>
        </div>

        {/* Page content here */}
        <Outlet />
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4 space-y-2">
          {/* Logo */}
          <RapidParcelLogo />

          {/* Sidebar Links */}
          <li>
            <NavLink to="/">
              <FaHome className="text-accent" /> Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/myParcels">
              <FaBox className="text-accent" /> My Parcels
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/paymentHistory">
              <FaCreditCard className="text-accent" /> Payment History
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/track">
              <FaMapMarkedAlt className="text-accent" /> Track Parcel
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/profile">
              <FaUserEdit className="text-accent" /> Update Profile
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DashBoardLayOut;
