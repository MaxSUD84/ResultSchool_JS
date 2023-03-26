// import React from "react";
// import { Link } from "react-router-dom";

import "./index.css";
import Nav from "./nav";
import NavItem from "./navItem";
import PropTypes from "prop-types";
import style from "../../styles/styles";
import { headerLinks } from "../../assets/staticData/labels";

const NavBar = () => {
  return (
    <>
      {/* <div className="divide-y divide-slate-100"> */}
      <div className={`${style.paddingX} ${style.flexCenter}`}>
        <div className="primary-navbar">
          <Nav>
            <>
              {headerLinks.map((el, index) => (
                <NavItem
                  key={`link_${index}`}
                  href={el.link}
                  style="font-semibold cursor-pointer mr-1 text-primary-500 block py-2 pr-2 pl-2 hover:text-primary-41 font-poppins"
                >
                  {el.label}
                </NavItem>
              ))}
            </>
          </Nav>
        </div>
      </div>
    </>
  );
};
NavBar.default = {
  isActive: false,
};

NavBar.propTypes = {
  href: PropTypes.string,
  isActive: PropTypes.bool,
  children: PropTypes.node,
};

export default NavBar;
