/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types";
import style from "../../styles/styles";
import Title from "../../components/articles/title";

const PersonalCard = ({
  full_name,
  experience_education,
  subject,
  education_rating,
  uuid_mentor
}) => {
  return (
    // <div className="flex flex-nowrap bg-gradient-to-r from-sky-50 to-stone-50 shadow rounded">
    <div className="bg-gradient-to-r from-sky-50 to-stone-50 shadow rounded">
      <div className={`justify-center px-6 py-6 w-64 shadow-sm`}>
        <div className="flex justify-center">
          <img
            src={`https://avatars.dicebear.com/api/avataaars/${(
              Math.random() + 1
            )
              .toString(36)
              .substring(7)}.svg`}
            className="rounded-full"
            alt="avatar"
            width="150"
            height="150"
          />
        </div>
        <div className={`${style.flexCenter} mb-3`}>
          <h3 className="text-lg font-normal text-primary-500">{full_name}</h3>
        </div>
        <div>
          <span>
            Профильный предмет: <p>{subject}</p>
          </span>
          {uuid_mentor && (
            <span>
              Классный руководитель: <p>{uuid_mentor}</p>
            </span>
          )}
        </div>
        <div>
          <span>{experience_education}</span>
        </div>
        <div>
          <span>
            Рейтинг учителя: <p>{education_rating}</p>
          </span>
        </div>
      </div>
    </div>
  );
};

PersonalCard.propTypes = {
  full_name: PropTypes.string,
  experience_education: PropTypes.string,
  subject: PropTypes.string,
  education_rating: PropTypes.string,
  uuid_mentor: PropTypes.string
};

export default PersonalCard;
