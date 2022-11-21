import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./index.css";

export default function NavItem({ href, children }) {
  return (
    // <li className="flex align-middle">
    <li
      className="font-semibold cursor-pointer mr-1
     text-primary-500 block py-2 pr-2 pl-2 hover:text-primary-41"
    >
      <Link
        to={href}
        // href={href}
        className={` font-semibold cursor-pointer `} // alter-mcol_2
      >
        {children}
      </Link>
    </li>
  );
}

NavItem.propTypes = {
  href: PropTypes.string.isRequired,
  // isActive: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired
};
