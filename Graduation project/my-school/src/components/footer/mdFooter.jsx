/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types";
import style from "../../styles/styles";
import NavItem from "../navBar/navItem";
import { headerLinks } from "../../assets/staticData/labels";
import { Logo } from "../../assets/logo/logo";
import { close } from "../../assets/icons";
import _ from "lodash";

const MediumFooter = (props) => {
  console.log(close);
  return (
    <div
      className={`${style.flexCenter} mt-6 pb-6 w-full bg-primary-2 shadow-1`}
    >
      <div
        className={`${style.flexCenter} ${style.boxWidth} flex-col flex-1 p-4`}
      >
        <div className=" flex w-full border-b-2 justify-center p-2 border-primary-41">
          <Logo
            width={250}
            height={(250 * 105) / 400}
            strokeColor="rgb(249 115 22)"
            strokeWidth="2"
          />
        </div>
        <div className="flex flex-row space-x-6">
          {headerLinks.map((el, index) => (
            <NavItem
              key={`link_${index}`}
              href={el.link}
              style="font-semibold cursor-pointer mr-1 text-primary-41 block py-2 pr-2 pl-2 hover:text-primary-42 font-poppins"
            >
              {el.label}
            </NavItem>
          ))}
        </div>
        <div className="flex flex-row space-x-8 align-middle justify-center py-4">
          {_.times(5).map((i) => (
            <div key={"icon_footer_" + i}>
              <img src={close} alt="icon" className="w-6 h-6 stroke-red-60" />
            </div>
          ))}
        </div>
        <p className="text-primary-200 font-semibold text-xs">
          Реализовано GMV
        </p>
      </div>
    </div>
  );
};

// MediumFooter.propTypes = {};

export default MediumFooter;

/*
    <section className={`flex-col ${style.flexCenter} sm:mb-20 mb-6`}>
      <div className={`${style.boxWidth} flex-row flex-1 ${style.paddingX}`}>

w-full flex justify-between items-center navbar py-2 px-6 pb-2 text-sm font-medium">
        <div className="w-[150px]">
          <Logo width={150} height={(150 * 105) / 400} />
        </div>
*/
