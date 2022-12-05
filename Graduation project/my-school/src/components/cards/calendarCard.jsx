/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types";

const CalendarCard = ({ date, eventTitle }) => {
  return (
    <div className="flex-nowrap m-2 bg-gradient-to-r from-sky-50 to-stone-50 shadow rounded">
      <div className={`flex-col rounded-t-lg  justify-center w-48 shadow-sm`}>
        <div className="flex justify-center">
          {/* <img
            src={"https://fakeimg.pl/350x300/?text=News icon&font=lobster"}
            className=" rounded-t-lg"
            alt="News"
          /> */}
        </div>
        <div className={`justify-center py-4`}>
          <h2 className="text-s font-bold px-4 text-primary-500 font-poppins">
            {date}
          </h2>
        </div>
        <div className={`juctify-end mb-1`}>
          <h4 className="text-xs font-semibold px-4 text-primary-500 font-poppins">
            {eventTitle}
          </h4>
        </div>
      </div>
    </div>
  );
};

CalendarCard.propTypes = {
  date: PropTypes.string,
  eventTitle: PropTypes.string
};

export default CalendarCard;
