/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types";
import style from "../../styles/styles";

const PersonalCard = (props) => {
  return (
    <div className="flex-nowrap bg-gradient-to-r from-sky-50 to-stone-50 shadow rounded">
      <div className={`flex-col justify-center px-6 py-6 w-64 shadow-sm`}>
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
          <h3 className="text-lg font-normal text-primary-500">
            Иванов Иван Иванович
          </h3>
        </div>
        <p className="text-xs font-body text-slate-400">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed aliquam
          nulla accusamus ipsa molestias, voluptates iure ex officia eveniet
          consequuntur non cum quidem unde eius! Optio magnam molestiae enim?
          Dolore.
        </p>
      </div>
    </div>
  );
};

PersonalCard.propTypes = {};

export default PersonalCard;
