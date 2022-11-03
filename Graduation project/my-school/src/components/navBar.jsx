// import React from "react";
// import { Link } from "react-router-dom";
import Nav from "./nav";
import NavItem from "./navItem";
import PropTypes from "prop-types";

const NavBar = () => {
  return (
    <>
      <div className="divide-y divide-slate-100">
        <Nav>
          <NavItem href="/" isActive>
            Главная
          </NavItem>
          <NavItem href="/news">Новости</NavItem>
          <NavItem href="/events">События</NavItem>
          <NavItem href="/managment">Сотрудники</NavItem>
          <NavItem href="/faq">Вопросы</NavItem>
          <NavItem href="/about">О школе</NavItem>
          <NavItem href="/login">Авторизоваться</NavItem>
        </Nav>
      </div>
    </>
  );
};
NavBar.default = {
  isActive: false
};

NavBar.propTypes = {
  href: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
  children: PropTypes.node.isRequired
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
