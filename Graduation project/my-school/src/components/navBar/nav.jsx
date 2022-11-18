import PropTypes from "prop-types";
import { Logo } from "../../assets/logo/logo";
import "./index.css";

export default function Nav({ children }) {
  return (
    <>
      <nav className="w-full flex justify-between items-center navbar py-2 px-6 pb-2 text-sm font-medium">
        <div className="w-[150px]">
          <Logo width={150} height={(150 * 105) / 400} />
        </div>
        <ul className="flex space-x-3 sm:flex justify-end items-center flex-1">
          {children}
        </ul>
      </nav>
      <div className="bg-primary-300 w-[100%] h-[2px] max-w-screen-xl mb-3" />
    </>
  );
}

Nav.propTypes = {
  children: PropTypes.node.isRequired
};
