/* eslint-disable indent */
import PropTypes from "prop-types";

const Modal = ({ active, setActive, children }) => {
  return (
    <div
      className={`
            w-full h-full
            top-0 left-0
            flex justify-center items-center
            fixed
            bg-black bg-opacity-30
            ${
              active
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none"
            }
            ease-linear duration-300
        `}
      onClick={() => setActive(false)}
    >
      <div
        className={`
                ${active ? "scale-100" : "scale-50"}
                p-4
                rounded
                bg-white
                transition duration-250 ease-out hover:ease-in
            `}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

Modal.propTypes = {
  active: PropTypes.bool,
  setActive: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default Modal;
