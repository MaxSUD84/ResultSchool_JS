/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types";

const BenefitCard = (props) => {
  return (
    <div className="pt-6 space-y-4">
      <div className="w-72 bg-white shadow rounded">
        <h1 className="flex-auto text-lg font-ligth text-primary-900">Main</h1>
        <button
          className="btn--primary h-10 px-6 font-semibold rounded-md border border-slate-200 bg-secondary-200 text-primary-900"
          type="button"
        >
          Нажми
        </button>
      </div>
    </div>
  );
};

BenefitCard.propTypes = {};

export default BenefitCard;
