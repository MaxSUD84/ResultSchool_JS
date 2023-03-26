/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types";
import style from "../../styles/styles";
import Title from "../elems/title";
import BenefitCard from "../cards/benefitCard";
import _ from "lodash";

const dataBL = {
  image_src: "https://fakeimg.pl/200x100/?text=Benefit icon&font=lobster",
  title: "Benefit_Title",
  text: `Lorem ipsum dolor sit amet consectetur adipisicing elit. 
  Unde, ipsa. Eos repellendus hic eaque culpa officiis.`
};

const BenefitsList = (props) => {
  return (
    <section className={`${style.flexCenterCol} flex-wrap mb-6`}>
      <div className={`${style.boxWidth} flex-row flex-1 ${style.paddingX}`}>
        <Title
          title_1="Преимущества выбора нашей школы"
          title_2=""
          styleType={0}
        />
        <div className={`${style.flexStartRow} flex-wrap gap-x-4 gap-y-4`}>
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
