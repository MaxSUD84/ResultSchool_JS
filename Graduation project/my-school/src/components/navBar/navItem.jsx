import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./index.css";

export default function NavItem({ href, children }) {
  return (
    <li>
      <Link
        to={href}
        // href={href}
        className={`text-primary-500 block py-2 pr-4 pl-3 hover:text-slate-300 lg:p-0 `}
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

/* ${ isActive,
          isActive ? "bg-sky-500 text-white" : "bg-slate-50"
        }
        */
