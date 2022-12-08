/* eslint-disable multiline-ternary */
import { useState } from "react";
import PropTypes from "prop-types";
import { Logo } from "../../assets/logo/logo";
import { Close, ThreeDotsVertical } from "../../assets/icons";
import "./index.css";

export default function Nav({ children }) {
  const [toggle, setToggle] = useState(false);
  return (
    <>
      {" "}
      <nav className="w-full flex justify-between items-center navbar py-2 px-6 pb-2 text-sm font-medium">
        <div className="w-[150px]">
          <Logo
            width={150}
            height={(150 * 105) / 400}
            strokeColor="#103869"
            strokeWidth="2"
          />
        </div>

        <ul className="list-none hidden lg:flex flex-row space-x-2 justify-end items-center flex-1">
          {children}
        </ul>

        <div className="flex flex-1 justify-end items-center lg:hidden">
          <div onClick={() => setToggle((p) => !p)}>
            {!toggle ? (
              <ThreeDotsVertical
                width="32px"
                height="32px"
                strokeColor="grey"
              />
            ) : (
              <Close width="32px" height="32px" strokeColor="grey" />
            )}
          </div>
          <div
            className={`${
              toggle ? "flex" : "hidden"
            } p-4 bg-gradient-to-r from-primary-1 to-slate-100
            absolute top-16 right-16 mx-4 my-2 min-w-[140px] rounded-md sidebar
            `}
          >
            <ul className="list-none flex flex-col space-x-3 sm:flex justify-end items-center flex-1">
              {children}
            </ul>
          </div>
        </div>
      </nav>
      <div className="bg-primary-300 w-[100%] h-[2px] max-w-screen-xl mb-3" />
    </>
  );
}

Nav.propTypes = {
  children: PropTypes.node.isRequired
};
