/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types";
import style from "../../styles/styles";
import BenefitCard from "./cards/benefitCard";

const BenefitsList = (props) => {
  return (
    <section className={`${style.flexCenter} flex-row flex-wrap sm:mb-20 mb-6`}>
      <div>
        <h1>Benefit list</h1>
        <div>
          <BenefitCard />
        </div>
      </div>
    </section>
  );
};

BenefitsList.propTypes = {};

export default BenefitsList;
