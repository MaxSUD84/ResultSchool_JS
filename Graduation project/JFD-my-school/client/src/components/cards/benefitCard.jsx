/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types";
import style from "../../styles/styles";

const BenefitCard = ({ imgSrc, title, text }) => {
  return (
    <div className="flex-nowrap bg-gradient-to-r from-sky-50 to-stone-50 shadow rounded">
      <div className={`flex-col justify-center px-2 py-2 w-48 shadow-sm`}>
        <div className="flex justify-center">
          <img
            src={imgSrc}
            className="rounded-1"
            alt="avatar"
            width="200"
            height="100"
          />
        </div>
        <div className={`${style.flexStart} mb-3`}>
          <h4 className="text-md font-normal text-primary-500">{title}</h4>
        </div>
        {/* <p className="text-xs font-body text-primary-300"> */}
        <p className={`${style.paragraph}`}>{text}</p>
      </div>
    </div>
  );
};

BenefitCard.propTypes = {
  imgSrc: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
};

export default BenefitCard;
