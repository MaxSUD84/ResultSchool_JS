/* eslint-disable indent */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import style from "../../styles/styles";
import { paginate } from "../../utils/paginate";
import _ from "lodash";

import PersonalCard from "../cards/personalCard";
import { useTeachers } from "../../hooks/useTeachers";
import Title from "../articles/title";
import FullNewArticle from "./fullNewArticle";

const Achievements = () => {
  const [achievements, setAchievements] = useState(1);
  return (
    <>
      <div className={`${style.flexCenter}`}>
        <div className={`${style.boxWidth} flex-1`}>
          <div className={""}>
            <div className="py-4 px-6">
              <Title title_1={"Наши достижения"} />
            </div>
            <div className="p-4">
              <FullNewArticle>
                <div className="w-fit justify-center">
                  <img src="https://fakeimg.pl/400x400/?text=Managment detail images&font=lobster" />
                </div>
                <div className="col-span-2">
                  <h3>Managment detail</h3>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Inventore error corrupti omnis odit, veniam suscipit culpa
                    nulla neque? Voluptatem similique nam est in quae dolorem
                    porro blanditiis explicabo nisi voluptates. Lorem ipsum
                    dolor sit amet consectetur adipisicing elit. Officiis rerum
                    maiores cupiditate accusantium alias? Ratione quae dolores
                    minus doloremque aspernatur atque eius repudiandae
                    temporibus, fuga quo laborum expedita facilis iure!
                  </p>
                </div>
              </FullNewArticle>
            </div>
            <div className="p-4">
              <FullNewArticle>
                <div className="col-span-2">
                  <h3>Managment detail</h3>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Inventore error corrupti omnis odit, veniam suscipit culpa
                    nulla neque? Voluptatem similique nam est in quae dolorem
                    porro blanditiis explicabo nisi voluptates. Lorem ipsum
                    dolor sit amet consectetur adipisicing elit. Officiis rerum
                    maiores cupiditate accusantium alias? Ratione quae dolores
                    minus doloremque aspernatur atque eius repudiandae
                    temporibus, fuga quo laborum expedita facilis iure!
                  </p>
                </div>
                <div className="w-fit justify-center">
                  <img src="https://fakeimg.pl/400x400/?text=Managment detail images&font=lobster" />
                </div>
              </FullNewArticle>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Achievements;
