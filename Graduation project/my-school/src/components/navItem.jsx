import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export default function NavItem({ href, isActive, children }) {
  return (
    <li>
      <Link
        to={href}
        // href={href}
        className={`block px-3 py-2 rounded-md ${
          isActive ? "bg-sky-500 text-white" : "bg-slate-50"
        }`}
      >
        {children}
      </Link>
    </li>
  );
}

NavItem.propTypes = {
  href: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired
};
