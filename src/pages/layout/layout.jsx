// import React, { useEffect, useState } from "react";
// import {
//   FaHandshake,
//   FaHome,
//   FaProductHunt,
//   FaSearch,
//   FaShoppingCart,
//   FaStore,
// } from "react-icons/fa";
// import { FaMessage, FaSignalMessenger } from "react-icons/fa6";
// import { Outlet, Link } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchAllUsers } from "../../store/slices/users";

// const Layout = () => {
//   const dispatch = useDispatch();

//   const users = useSelector((state) => state);

//   useEffect(() => {
//     dispatch(fetchAllUsers());

//     console.log("fetche all users from the layout", users);
//   }, []);

//   return (
//     <div className="w-screen h-screen grid grid-flow-col grid-cols-12 fixed">
//       <div className="col-span-2 w-full h-full bg-black flex flex-col p-8 text-white border border-black">
//         <span className="font-bold text-2xl">Task Managment App</span>

//         <div className="mt-8 w-full flex flex-col gap-6">
//           <Link
//             to="task-manager"
//             className="menu-button rounded-md w-full py-2 text-white px-4 shadow-md hover:bg-white/20 active:bg-white/20 flex gap-3 items-center"
//           >
//             <FaShoppingCart className="light-icon" />
//             Task Manager
//           </Link>

//           <Link
//             to="users"
//             className="menu-button rounded-md w-full py-2 text-white px-4 shadow-md hover:bg-white/20 active:bg-white/20 flex gap-3 items-center"
//           >
//             <FaHome className="light-icon" />
//             Users
//           </Link>

//           <Link
//             to="status"
//             className="menu-button rounded-md w-full py-2 text-white px-4 shadow-md hover:bg-white/20 active:bg-white/20 flex gap-3 items-center"
//           >
//             <FaStore className="light-icon" />
//             Status
//           </Link>
//         </div>
//       </div>

//       <div className="col-span-10 w-full h-full border bg-slate-100 p-4 overflow-y-auto">
//         {/* <div className="w-full px-4 py-4 bg-white rounded-md shadow-md flex justify-between items-center">
//           <div className="border bg-white shadow-sm rounded-md flex items-center w-fit px-3">
//             <input
//               type="text"
//               className="w-60 py-1 bg-transparent focus:outline-0 placeholder:text-black/50"
//               placeholder="Search"
//             />

//             <FaSearch className="ml-3 bg-transparent" />
//           </div>

//           <div className="flex gap-3">
//             <div className="flex flex-col text-end justify-center">
//               <span className="text-sm font-semibold">Muhammad Moiz</span>
//               <span className="text-sm">Admin</span>
//             </div>

//             <div className="rounded-full bg-black/20 p-6"></div>
//           </div>
//         </div> */}

//         <Outlet />
//       </div>
//     </div>
//   );
// };

// export default Layout;

import React, { useEffect, useState } from "react";
import {
  FaHandshake,
  FaHome,
  FaProductHunt,
  FaSearch,
  FaShoppingCart,
  FaStore,
} from "react-icons/fa";
import { Outlet, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllUsers,
  changeIsUserAdmin,
  updateUserInfo,
} from "../../store/slices/users";
import { Button, Modal } from "antd";
import { fetchAuthSession, signOut } from "aws-amplify/auth";
import Cookies from "js-cookie";

const Layout = () => {
  const [isSignOutModalVisible, setIsSignOutModalVisible] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const fetchedUsers = useSelector(
    (state) => state.users.fetchAllUsersResponse.response
  );

  const isAdmin = useSelector(
    (state) => state.users.fetchAllUsersResponse.isUserAdmin
  );

  

  useEffect(() => {
    currentSession();
  }, []);

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  useEffect(() => {
    console.log("Fetched users:", fetchedUsers);
  }, [fetchedUsers]);

  async function currentSession() {
    try {
      const { accessToken, idToken } = (await fetchAuthSession()).tokens ?? {};

      Cookies.set("access_token", accessToken);
      Cookies.set("id_token", idToken);

      if (idToken.payload["custom:type"] == "Admin") {
        dispatch(changeIsUserAdmin(true));
      } else {
        dispatch(changeIsUserAdmin(false));
      }

      // console.log("email", idToken.payload.email,
      //     "sub", idToken.payload.sub,)

      dispatch(
        updateUserInfo({
          email: idToken.payload.email,
          id: idToken.payload.sub,
        })
      );

      console.log("access tokennn", accessToken);
      console.log("id Tokennn", idToken);
    } catch (err) {
      console.log(err);
    }
  }

  function handleSignOutModal() {
    setIsSignOutModalVisible(true);
  }

  function handleSignOutCancel() {
    setIsSignOutModalVisible(false);
  }

  async function handleSignOut() {
    try {
      await signOut();
    } catch (error) {
      console.log("error signing out: ", error);
    }
  }

  return (
    <div className="w-screen h-screen grid grid-flow-col grid-cols-12 fixed">
      <div className="col-span-2 w-full h-full bg-black flex flex-col p-8 text-white border border-black justify-between">
        <div>
          <span className="font-bold text-2xl">Dummy App</span>

          {isAdmin ? (
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
                Create Room
              </Link>
            </div>
          ) : (
            <div className="mt-8 w-full flex flex-col gap-6">
              <Link
                to="task-manager"
                className="menu-button rounded-md w-full py-2 text-white px-4 shadow-md hover:bg-white/20 active:bg-white/20 flex gap-3 items-center"
              >
                <FaShoppingCart className="light-icon" />
                Task Manager
              </Link>

              <Link
                to="status"
                className="menu-button rounded-md w-full py-2 text-white px-4 shadow-md hover:bg-white/20 active:bg-white/20 flex gap-3 items-center"
              >
                <FaStore className="light-icon" />
                Room
              </Link>
            </div>
          )}
        </div>

        <Button key="save" type="primary" onClick={handleSignOutModal}>
          Sign Out
        </Button>

        {/* Sign Out Modal */}
        <Modal
          title="Sign Out"
          open={isSignOutModalVisible}
          onCancel={handleSignOutCancel}
          footer={[
            <Button key="signOut" type="primary" danger onClick={handleSignOut}>
              Sign Out
            </Button>,
            <Button key="cancel" onClick={handleSignOutCancel}>
              Cancel
            </Button>,
          ]}
        >
          <p>Are you sure you want to dismiss this session ?</p>
        </Modal>
      </div>

      <div className="col-span-10 w-full h-full border bg-slate-100 p-4 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
