// import React from "react";
// import { Link } from "react-router-dom";

import "./index.css";
import Nav from "./nav";
import NavItem from "./navItem";
import PropTypes from "prop-types";
import style from "../../styles/styles";

const NavBar = () => {
  return (
    <>
      {/* <div className="divide-y divide-slate-100"> */}
      <div className={`${style.paddingX} ${style.flexCenter}`}>
        <div className="primary-navbar">
          <Nav>
            <NavItem href="/" isActive>
              Главная
            </NavItem>
            <NavItem href="/news">Новости</NavItem>
            <NavItem href="/events">События</NavItem>
            <NavItem href="/managment">Сотрудники</NavItem>
            <NavItem href="/faq">Вопросы</NavItem>
            <NavItem href="/about">О школе</NavItem>
            <div className="border-l-[2px] border-primary-41 pl-3">
              <button
                className="border-[3px] ring-1 ring-primary-300 
                ring-opacity-40 rounded-md border-primary-42 px-4 py-sm "
              >
                <NavItem href="/login">Авторизоваться</NavItem>
              </button>
            </div>
          </Nav>
        </div>
      </div>
    </>
  );
};
NavBar.default = {
  isActive: false
};

NavBar.propTypes = {
  href: PropTypes.string,
  isActive: PropTypes.bool,
  children: PropTypes.node
};

export default NavBar;

/*
    <ul className="nav nav-pills">
      <li className="nav-item">
        <Link className="nav-link" to="/">
          Main
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/login">
          Login
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/users">
          Users
        </Link>
      </li>
    </ul>
*/
