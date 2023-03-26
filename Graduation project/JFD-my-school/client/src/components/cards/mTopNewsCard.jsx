/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types";
// Style
import style from "../../styles/styles";
// Config
import cfg from "../../config.json";

const TopNewsCard = ({ title, date, shortText, ...rest }) => {
  return (
    <div
      className="flex-wrap m-2 bg-gradient-to-r from-sky-50 to-stone-50 shadow rounded"
      onClick={() => rest.onClick(rest.id)}
    >
      <div className={`flex-col rounded-lg  justify-center w-80 shadow-m`}>
        {/* <article className="prose prose-slate"> */}
        <div className="flex justify-center">
          <img
            src={
              rest?.img?.startsWith("http")
                ? "https://fakeimg.pl/400x400/?text=Hero images&font=lobster"
                : cfg.apiEndpoint + rest.img
            }
            className=" rounded-t-lg -m-2"
            alt="News"
          />
        </div>
        <div className={`justify-end`}>
          <h2 className="text-s font-bold px-4 my-2 text-primary-500 font-poppins">
            {title}
          </h2>
        </div>
        <div className={`juctify-end mb-1`}>
          <h4 className="text-s font-semibold px-4 my-1 text-primary-500 font-poppins">
            {date}
          </h4>
        </div>
        <div>
          <p className="text-xs font-body px-4 mb-3 my-1 text-slate-600 line-clamp-3">
            {shortText}
          </p>
        </div>
        {/* </article> */}
      </div>
    </div>
  );
};

TopNewsCard.propTypes = {
  title: PropTypes.string,
  date: PropTypes.string,
  shortText: PropTypes.string,
};

export default TopNewsCard;
