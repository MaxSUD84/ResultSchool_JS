/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types";
import style from "../../styles/styles";

const TopNewsCard = ({ title, date, shortText }) => {
  return (
    <div className="flex-nowrap m-2 bg-gradient-to-r from-sky-50 to-stone-50 shadow rounded">
      <div className={`flex-col rounded-t-lg  justify-center w-72 shadow-sm`}>
        <div className="flex justify-center">
          <img
            src={"https://fakeimg.pl/350x300/?text=News icon&font=lobster"}
            className=" rounded-t-lg"
            alt="News"
          />
        </div>
        <div className={`justify-start mb-1`}>
          <h2 className="text-s font-bold px-4 text-primary-500 font-poppins">
            {title}
          </h2>
        </div>
        <div className={`juctify-end mb-1`}>
          <h4 className="text-xs font-semibold px-4 text-primary-500 font-poppins">
            {date}
          </h4>
        </div>
        <p className="text-xs font-body px-4 pb-4 text-slate-400">
          {shortText}
        </p>
      </div>
    </div>
  );
};

TopNewsCard.propTypes = {
  title: PropTypes.string,
  date: PropTypes.string,
  shortText: PropTypes.string
};

export default TopNewsCard;
