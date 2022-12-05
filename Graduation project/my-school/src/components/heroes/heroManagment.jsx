/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types";
import style from "../../styles/styles";

const HeroManagment = (props) => {
  return (
    <section className={`flex-col ${style.flexCenter} sm:mb-20 mb-6`}>
      <div className={`${style.boxWidth} flex-row flex-1 ${style.paddingX}`}>
        <h1 className={`${style.heading2} items-start`}>Hero</h1>
        <div className="space-y-0 justify-center items-center">
          <div className={`flex-col ${style.flexCenter} space-y-1 `}>
            <img src="https://fakeimg.pl/1080x400/?text=Managment detail images&font=lobster" />
            <h2>Managment detail</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore
              error corrupti omnis odit, veniam suscipit culpa nulla neque?
              Voluptatem similique nam est in quae dolorem porro blanditiis
              explicabo nisi voluptates. Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Officiis rerum maiores cupiditate accusantium
              alias? Ratione quae dolores minus doloremque aspernatur atque eius
              repudiandae temporibus, fuga quo laborum expedita facilis iure!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

HeroManagment.propTypes = {};

export default HeroManagment;
