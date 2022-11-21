/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types";
import style from "../../styles/styles";
import BenefitCard from "./cards/benefitCard";
import _ from "lodash";

const dataBL = {
  image_src: "https://fakeimg.pl/200x100/?text=Benefit icon&font=lobster",
  title: "Benefit_Title",
  text: `Lorem ipsum dolor sit amet consectetur adipisicing elit. 
  Unde, ipsa. Eos repellendus hic eaque culpa officiis.`
};

const BenefitsList = (props) => {
  return (
    <section className={`${style.flexCenter} flex-col flex-wrap sm:mb-20 mb-6`}>
      <div className={`${style.boxWidth} flex-row flex-1 ${style.paddingX}`}>
        <h1 className={`${style.heading2} items-start`}>Benefit list</h1>
        <div className={`flex-row flex-wrap ${style.flexStart}  `}>
          {_.fill(Array(5), dataBL).map((data, index) => (
            <BenefitCard
              key={"bfc_" + index}
              imgSrc={data.image_src}
              title={data.title}
              text={data.text}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

BenefitsList.propTypes = {};

export default BenefitsList;
