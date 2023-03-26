/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types";
import style from "../../styles/styles";
import Title from "../elems/title";

// Config
import configFile from "../../config.json";

const PersonalCard = ({
  full_name,
  experience_education,
  subject,
  education_rating,
  image,
  name_mentor,
}) => {
  return (
    // <div className="flex flex-nowrap bg-gradient-to-r from-sky-50 to-stone-50 shadow rounded">
    <div className="bg-gradient-to-r from-sky-50 to-stone-50 shadow rounded">
      <div
        className={`
        justify-center px-6 py-6 w-72 shadow-sm
        text-sm 
        `}
      >
        <div className="flex justify-center">
          <img
            src={configFile.apiEndpoint + image}
            className="rounded-2xl"
            alt="avatar"
            width="200"
            height="200"
          />
        </div>
        <div className={`${style.flexCenter} justify-center mb-3`}>
          <h3 className="text-lg font-normal text-primary-500">{full_name}</h3>
        </div>
        <div>
          <span>
            Профильный предмет: <p>{subject}</p>
          </span>
          {name_mentor && (
            <span>
              Классный руководитель: <p>{name_mentor}</p>
            </span>
          )}
        </div>
        <div>
          <span>{experience_education}</span>
        </div>
        {/* <div>
          <span>
            Рейтинг учителя: <p>{education_rating}</p>
          </span>
        </div> */}
      </div>
    </div>
  );
};

PersonalCard.propTypes = {
  full_name: PropTypes.string,
  experience_education: PropTypes.string,
  subject: PropTypes.string,
  image: PropTypes.string,
  education_rating: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  name_mentor: PropTypes.string,
};

export default PersonalCard;
