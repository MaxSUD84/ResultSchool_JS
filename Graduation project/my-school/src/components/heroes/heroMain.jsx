/* eslint-disable no-unused-vars */
// import React from "react";
import PropTypes from "prop-types";
import style from "../../styles/styles";

const HeroMain = (props) => {
  return (
    <section className={`${style.flexCenter} sm:mb-20 mb-6`}>
      <div className={`flex-row flex-1 ${style.paddingX}`}>
        <h1 className="font-mono items-start text-xl">Hero</h1>
        <div className="space-y-0 justify-start">
          <div className="flex-row space-x-3">
            <p>Ligth button:</p>{" "}
            <button
              className="
              w-full lg:w-fit text-center rounded inline-block bg-transparent outline-none ring-inset ring-1 disabled:opacity-20 
              focus-visible:ring-1 text-primary-500 ring-primary-300 hover:bg-primary-300/10 px-6 py-3
            "
            >
              {" "}
              Click Me{" "}
            </button>
            <button
              className="
              w-full lg:w-fit text-center font-mono rounded inline-block bg-slate-200 outline-none ring-inset ring-1 disabled:opacity-20 
              focus-visible:ring-1 text-primary-500 ring-primary-300 hover:bg-primary-300/30 px-6 py-3
            "
            >
              {" "}
              Click Me{" "}
            </button>
            <button
              className="
              w-full lg:w-fit text-center rounded inline-block bg-transparent outline-none ring-inset ring-1 disabled:opacity-20 
              focus-visible:ring-3 
              text-primary-500 
              ring-primary-300
              hover:bg-gradient-to-r from-cyan-600 to-blue-200 px-6 py-3
            "
            >
              {" "}
              Click Me{" "}
            </button>
            <button
              className="
              w-full lg:w-fit text-center rounded inline-block bg-transparent outline-none ring-inset ring-1 disabled:opacity-20 
              focus-visible:ring-2 
              text-primary-500 
              ring-primary-300 
              hover:bg-gradient-to-r from-alter-prim_1 to-primary-300 hover:text-alter-mcol_2
              hover:ring-alter-mcol_1 hover:ring-2
              px-6 py-3
            "
            >
              {" "}
              Click Me{" "}
            </button>
          </div>
          <div className="flex-row space-x-3">
            <p>Dark button:</p>{" "}
            <button
              className="
              w-full lg:w-fit text-center rounded inline-block bg-primary-300 outline-none ring-inset ring-1 disabled:opacity-20 
              px-6 py-3
              focus-visible:ring-1 
              text-primary-100 
              ring-primary-500/60 
              hover:bg-gradient-to-r from-alter-prim_1 to-primary-300
              hover:text-alter-mcol_1
            "
            >
              {" "}
              Click Me{" "}
            </button>
            <button
              className="
              w-full lg:w-fit text-center font-mono rounded inline-block outline-none ring-inset ring-1 disabled:opacity-20 
              focus-visible:ring-0 px-6 py-3
              text-alter-mcol_1
              bg-gradient-to-r from-alter-prim_1 to-primary-300/60 
              ring-alter-mcol_1 
              hover:bg-slate-300/40
              hover:ring-alter-mcol_2
              hover:text-alter-mcol_2
            "
            >
              {" "}
              Click Me{" "}
            </button>
            <button
              className="
              w-full lg:w-fit text-center px-6 py-3 rounded inline-block outline-none ring-inset ring-1 disabled:opacity-20 
              focus-visible:ring-1 
              bg-gradient-to-r from-teal-500 to-alter-prim_1/70 
              text-alter-prim_1 
              ring-alter-prim_1 
              hover:bg-slate-200
            "
            >
              {" "}
              Click Me{" "}
            </button>
            <button
              className="
              w-full lg:w-fit text-center rounded inline-block bg-transparent outline-none ring-inset ring-1 disabled:opacity-20 
              focus-visible:ring-1 text-primary-500 ring-primary-300 hover:bg-primary-300/10 px-6 py-3
            "
            >
              {" "}
              Click Me{" "}
            </button>
          </div>
          <div className="flex-row space-x-3">
            <p>Input:</p>{" "}
            <input
              className="
              mt-1 px-2 py-1
              block
              w-full
              rounded-md
              border-gray-100
              shadow-md
              placeholder:italic placeholder:text-slate-400
              focus:border-indigo-300  
              focus:ring focus:ring-indigo-200 focus:ring-opacity-50`
            "
              placeholder="Text input here ..."
            />
          </div>
        </div>
      </div>
    </section>
  );
};

HeroMain.propTypes = {};

export default HeroMain;
