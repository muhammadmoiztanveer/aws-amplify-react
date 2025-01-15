import React from "react";
import {
  FaHandshake,
  FaHome,
  FaProductHunt,
  FaSearch,
  FaShoppingCart,
  FaStore,
} from "react-icons/fa";
import { FaMessage, FaSignalMessenger } from "react-icons/fa6";
import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <div className="w-screen h-screen grid grid-flow-col grid-cols-12 fixed">
      <div className="col-span-2 w-full h-full bg-black flex flex-col p-8 text-white border border-black">
        <span className="font-bold text-2xl">AWS Amplify</span>

        <div className="mt-8 w-full flex flex-col gap-6">
          <Link
            to="task-manager"
            className="menu-button rounded-md w-full py-2 text-white px-4 shadow-md hover:bg-white/20 active:bg-white/20 flex gap-3 items-center"
          >
            <FaShoppingCart className="light-icon" />
            Task Manager
          </Link>

          <Link
            to="users"
            className="menu-button rounded-md w-full py-2 text-white px-4 shadow-md hover:bg-white/20 active:bg-white/20 flex gap-3 items-center"
          >
            <FaHome className="light-icon" />
            Users
          </Link>

          <Link
            to="status"
            className="menu-button rounded-md w-full py-2 text-white px-4 shadow-md hover:bg-white/20 active:bg-white/20 flex gap-3 items-center"
          >
            <FaStore className="light-icon" />
            Status
          </Link>
        </div>
      </div>

      <div className="col-span-10 w-full h-full border bg-slate-100 p-4 overflow-y-auto">
        {/* <div className="w-full px-4 py-4 bg-white rounded-md shadow-md flex justify-between items-center">
          <div className="border bg-white shadow-sm rounded-md flex items-center w-fit px-3">
            <input
              type="text"
              className="w-60 py-1 bg-transparent focus:outline-0 placeholder:text-black/50"
              placeholder="Search"
            />

            <FaSearch className="ml-3 bg-transparent" />
          </div>

          <div className="flex gap-3">
            <div className="flex flex-col text-end justify-center">
              <span className="text-sm font-semibold">Muhammad Moiz</span>
              <span className="text-sm">Admin</span>
            </div>

            <div className="rounded-full bg-black/20 p-6"></div>
          </div>
        </div> */}

        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
