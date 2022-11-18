import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./index.css";

export default function NavItem({ href, children }) {
  return (
    <li className="flex align-middle">
      <Link
        to={href}
        // href={href}
        className={`text-primary-500 block py-2 pr-4 pl-3 font-semibold cursor-pointer hover:text-alter-mcol_1 lg:p-0 `} // alter-mcol_2
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
