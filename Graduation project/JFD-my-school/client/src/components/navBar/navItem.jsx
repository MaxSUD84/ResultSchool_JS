import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import "./index.css";

export default function NavItem({ href, children, style }) {
  return (
    <>
      <li className={style}>
        <NavLink
          to={href}
          className={`
            font-semibold lg:text-primary-2 lg:hover:text-primary-41
            text-primary-41 hover:text-blue-400  
            cursor-pointer lg:no-underline underline underline-offset-2`}
        >
          {children}
        </NavLink>
      </li>
    </>
  );
}

NavItem.propTypes = {
  href: PropTypes.string.isRequired,
  // isActive: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  style: PropTypes.string.isRequired,
};
