import PropTypes from "prop-types";
import "./index.css";

export default function Nav({ children }) {
  return (
    <nav className="py-4 px-6 text-sm font-medium">
      <ul className="flex space-x-3">{children}</ul>
    </nav>
  );
}

Nav.propTypes = {
  children: PropTypes.node.isRequired
};
