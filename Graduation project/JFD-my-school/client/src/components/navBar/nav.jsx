/* eslint-disable multiline-ternary */
import { useState } from "react";
import { Logo } from "../../assets/logo/logo";
import { NavLink } from "react-router-dom";
import NavProfile from "./navProfile";
import { useSelector } from "react-redux";
// import { UserProvider } from "../../hooks/useUser";
import PropTypes from "prop-types";

// Service
import localStorageService from "../../services/localStorage.service";

// Store
// import {
//   isLoggedInSelector,
//   // getCurrentUserId,
//   // isTeacherLogged,
// } from "../../store/authSlice";
import { isLoadedCurrentUser } from "../../store/authUser";

// Styles and Icons
import { FaEllipsisV, FaUserGraduate, FaRegWindowClose } from "react-icons/fa";
import "./index.css";
import style from "../../styles/styles";

export default function Nav({ children }) {
  const [toggle, setToggle] = useState(false);
  const isLoggedIn = useSelector(isLoadedCurrentUser());

  return (
    <>
      <nav className="w-full flex justify-between items-center navbar py-2 px-6 pb-2 text-sm font-medium">
        <div className="w-[150px]">
          <Logo
            width={150}
            height={(150 * 105) / 400}
            strokeColor="#103869"
            strokeWidth="2"
          />
        </div>

        <div
          className={`
          flex flex-row
        `}
        >
          <ul className="list-none hidden lg:order-1 order-2 lg:flex flex-row space-x-2 justify-end items-center flex-1">
            {children}
          </ul>

          <div
            className={`
              flex flex-row justify-center items-center w-fit
              lg:border-l-2 lg:order-2 order-1 border-spacing-x-3 border-stone-400
              ${style.paragraph} mx-3
              `}
          >
            {isLoggedIn ? (
              // <UserProvider>
              //   <NavProfile />
              // </UserProvider>
              <NavProfile />
            ) : (
              <NavLink
                className="flex flex-row justify-center items-center w-fit"
                to="auth/login"
                onClick={() => localStorageService.removeAuthData()}
              >
                <FaUserGraduate className="w-10 h-10 text-primary-2 p-2 px-3 hover:text-primary-41" />
                Login
              </NavLink>
            )}
          </div>

          <div className="flex flex-1 justify-end items-center lg:hidden border-l-2 border-stone-400 order-3">
            <div onClick={() => setToggle((p) => !p)}>
              {!toggle ? (
                <FaEllipsisV className="w-8 h-8 ml-2 text-stone-400" />
              ) : (
                <FaRegWindowClose className="w-8 h-8 ml-2 text-stone-400" />
              )}
            </div>
            <div
              className={`${
                toggle ? "flex" : "hidden"
              } p-4 bg-gradient-to-r from-primary-1 to-purple-800
                absolute top-16 right-8 mx-4 my-2 min-w-[140px] rounded-md sidebar
                ring-2 ring-primary-42 shadow-md shadow-purple-600
                z-100
            `}
            >
              <ul className="list-none flex flex-col space-x-3 sm:flex justify-end items-center text-primary-42 hover:text-blue-400  flex-1">
                {children}
              </ul>
            </div>
          </div>
        </div>
      </nav>
      <div className="bg-primary-300 w-[100%] h-[2px] max-w-screen-xl mb-3" />
    </>
  );
}

Nav.propTypes = {
  children: PropTypes.node.isRequired,
};
