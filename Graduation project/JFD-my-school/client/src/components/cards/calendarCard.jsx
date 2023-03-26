/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types";

const styles = [
  {
    mainStyle: "bg-gradient-to-r from-sky-50 to-stone-50 shadow rounded"
  }
];

const CalendarCard = ({ date, eventTitle, styleType }) => {
  return (
    <div
      className={`flex flex-col md:w-48 w-3/12 ${styles[styleType].mainStyle} border-2 border-sky-200`}
    >
      <div className={`flex flex-col`}>
        <div className={`flex justify-end md:p-4 p-2`}>
          <h2 className="select-none md:text-4xl text-2xl font-bold md:px-4 text-slate-500 font-poppins">
            {date}
          </h2>
        </div>
        <div className={`justify-start md:inline-flex hidden pb-1 mb-1`}>
          <p className="select-none text-xs font-bold px-4 text-primary-500 font-poppins">
            {eventTitle}
          </p>
        </div>
      </div>
    </div>
  );
};

CalendarCard.default = {
  eventTitle: "",
  styleType: 0
};

CalendarCard.propTypes = {
  date: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  eventTitle: PropTypes.string,
  styleType: PropTypes.number
};

export default CalendarCard;
