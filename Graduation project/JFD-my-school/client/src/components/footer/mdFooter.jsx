/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types";
import style from "../../styles/styles";
import NavItem from "../navBar/navItem";
import { headerLinks } from "../../assets/staticData/labels";
import { Logo } from "../../assets/logo/logo";
import {
  FaDiscord,
  FaInstagram,
  FaWhatsapp,
  FaVk,
  FaRegEnvelope,
} from "react-icons/fa";
import _ from "lodash";

const MediumFooter = (props) => {
  return (
    <div
      className={`${style.flexCenterCol} mt-6 pb-6 w-full bg-primary-2 shadow-1`}
    >
      <div className={`${style.flexCenterCol} ${style.boxWidth} flex-1 p-4`}>
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
            <NavItem key={`link_${index}`} href={el.link} style="list-none">
              <p className="font-semibold cursor-pointer mr-1 text-primary-41 block py-2 pr-2 pl-2 hover:text-primary-42 font-poppins">
                {el.label}
              </p>
            </NavItem>
          ))}
        </div>
        <div className="flex flex-row space-x-8 align-middle justify-center py-2">
          {[
            <FaDiscord className="w-6 h-6" key={"9BDTwpvy2RFw1Uc8KHC8L"} />,
            <FaInstagram className="w-6 h-6" key={"xSuFYA3FiXLh7flMJhmS2"} />,
            <FaWhatsapp className="w-6 h-6" key={"rNNuHTPeSoS_dM_Q2bh7Q"} />,
            <FaVk className="w-6 h-6" key={"GhpHm17mW__oceDyh4MOA"} />,
            <FaRegEnvelope className="w-6 h-6" key={"bkPb0s7p6KFxdo3wyUbkz"} />,
          ].map((icon, ind) => {
            return (
              <div key={`${icon}_${ind}`} className="text-yellow-200">
                {icon}
              </div>
            );
          })}
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
