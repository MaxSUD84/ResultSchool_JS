/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

// Store
import { useDispatch, useSelector } from "react-redux";
import {
  // ReloadData,
  isLoadedCurrentUser,
  getCurrentUserData,
} from "../../store/authUser";

// Component
import Preloader from "../ui/preloader";
import Modal from "../modals/modal";
import AddAdditionalEduc from "../forms/addAdditionalEduc";
import { FaAward, FaBasketballBall, FaUniversity } from "react-icons/fa";

// Service
import learnersService from "../../services/learners.service";

// Styles
import style from "../../styles/styles";

// const advEduc = {
//   achievements: [
//     {
//       id: "AIDCj9Hy3x",
//       content: "Грамота за второе место в турнире по футболу. 21.06.21",
//     },
//   ],
//   hobby: [
//     { id: "G2G1fPEmCC", content: "Горные лыжи" },
//     { id: "006Zmu6rUM", content: "Футбол" },
//     { id: "f_0EIoBuRy", content: "Плавание" },
//   ],
//   add_education: [
//     { id: "luGyqUCXZd", content: "Секция футбола, пн,чт: 15:00-18:00" },
//     { id: "9rCAla31xM", content: "Англиский язык, вт,пт: 17:00-18:00" },
//   ],
// };

const AdvEducation = () => {
  const dispatch = useDispatch();
  const isCurUserLoaded = useSelector(isLoadedCurrentUser());
  const curUser = useSelector(getCurrentUserData());

  const [modalActivate, setModalActivate] = useState(false);
  const [editData, setEditData] = useState();
  const [achievements, setAchievements] = useState([]);
  const [hobby, setHobby] = useState([]);
  const [add_education, setAdd_education] = useState([]);

  useEffect(() => {
    if (isCurUserLoaded) {
      setAchievements(curUser.achievements);
      setHobby(curUser.hobby);
      setAdd_education(curUser.add_education);
    }
  }, [isCurUserLoaded, curUser]);

  if (!isCurUserLoaded)
    return (
      <>
        <div className="w-full h-[400px]"></div>
        <Preloader />
      </>
    );

  const handleEditAddEducation = () => {
    setEditData({
      arrContentData: add_education,
      label: "Дополнительное образование",
      type: "add_education",
    });
    setModalActivate(true);
  };

  const handleEditAddAchievements = () => {
    setEditData({
      arrContentData: achievements,
      label: "Награды и достижения",
      type: "achievements",
    });
    setModalActivate(true);
  };

  const handleEditAddHobby = () => {
    setEditData({
      arrContentData: hobby,
      label: "Увлечения",
      type: "hobby",
    });
    setModalActivate(true);
  };

  const handleSubmit = (type, data) => {
    switch (type) {
      case "add_education":
        setAdd_education(data);
        break;
      case "achievements":
        setAchievements(data);
        break;
      case "hobby":
        setHobby(data);
        break;
      default:
    }
    setEditData();
  };

  const handlePushChanges = async () => {
    await learnersService.postAdditionalData({
      hobby,
      add_education,
      achievements,
      learnerId: curUser._id,
    });
    location.reload();
  };

  return (
    <div
      className={`
            ${style.boxWidth} w-full ${style.paddingX}
            flex flex-col
            md:flex-row md:flex-nowrap
            gap-3 
        `}
    >
      <div
        className={`
                flex flex-col md:basis-1/3 w-full
            `}
      >
        <div className="flex flex-row justify-between items-center">
          <p
            className={`
          font-semibold text-lg text-primary-1
          m-2
          `}
          >
            Дополнительное образование:
          </p>
          <FaUniversity
            className="h-10 w-10 m-2 border-2 rounded-md 
            text-primary-2 ring-1 ring-primary-2 shadow-primary-300
            hover:ring-primary-47 shadow-md hover:shadow-green-400
            hover:bg-green-100 hover:text-green-800
            "
            onClick={handleEditAddEducation}
          />
        </div>

        <div
          className={`
                ring-1 ring-black rounded
                shadow-md shadow-slate-400
                bg-slate-100 p-4
                flex flex-col justify-start items-start
                min-h-[150px]
            `}
        >
          <ul>
            {add_education.map((ed) => (
              <li key={ed.id}>{ed.content}</li>
            ))}
          </ul>
        </div>
      </div>
      <div
        className={`
                flex flex-col md:basis-1/3 w-full
            `}
      >
        <div className="flex flex-row justify-between items-center">
          <p
            className={`
          font-semibold text-lg text-primary-1
          m-2
          `}
          >
            Увлечения:
          </p>
          <FaBasketballBall
            className="h-10 w-10 m-2 border-2 rounded-md 
            text-primary-2 ring-1 ring-primary-2 shadow-primary-300
            hover:ring-primary-47 shadow-md hover:shadow-green-400
            hover:bg-green-100 hover:text-green-800
            "
            onClick={handleEditAddHobby}
          />
        </div>
        <div
          className={`
            ring-1 ring-black rounded
            shadow-md shadow-slate-400
            bg-slate-100 p-4
            flex flex-col justify-start items-start
            min-h-[150px]
          `}
        >
          <ul>
            {hobby.map((ed) => (
              <li key={ed.id}>{ed.content}</li>
            ))}
          </ul>
        </div>
      </div>
      <div
        className={`
                flex flex-col md:basis-1/3 w-full
            `}
      >
        <div className="flex flex-row justify-between items-center">
          <p
            className={`
            font-semibold text-lg text-primary-1
            m-2
            `}
          >
            Награды и достижения:
          </p>
          <FaAward
            className="h-10 w-10 m-2 border-2 rounded-md 
            text-primary-2 ring-1 ring-primary-2 shadow-primary-300
            hover:ring-primary-47 shadow-md hover:shadow-green-400
            hover:bg-green-100 hover:text-green-800
            "
            onClick={handleEditAddAchievements}
          />
        </div>
        <div
          className={`
                ring-1 ring-black rounded
                shadow-md shadow-slate-400
                bg-slate-100 p-4
                flex flex-col justify-start items-start
                min-h-[150px]
            `}
        >
          <ul>
            {achievements.map((ed) => (
              <li key={ed.id}>{ed.content}</li>
            ))}
          </ul>
        </div>

        <div className={`flex flex-row justify-end w-full`}>
          <button
            type="button"
            className={`
              w-[200px] h-14 my-3 
              bg-green-400 text-primary-1 rounded-md
              hover:bg-green-500 hover:ring-2 ring-primary-2
              shadow-md shadow-slate-300 hover:shadow-purple-500
              text-xl font-semobold font-body hover:underline
              `}
            onClick={handlePushChanges}
          >
            {"Сохранить"}
          </button>
        </div>
      </div>
      {/* Modal window */}
      <div>
        {editData && (
          <Modal active={modalActivate} setActive={setModalActivate}>
            <AddAdditionalEduc
              {...editData}
              onClose={() => setModalActivate(false)}
              onSubmit={handleSubmit}
            />
          </Modal>
        )}
      </div>
    </div>
  );
};

AdvEducation.propTypes = {
  // achievements: PropTypes.array,
  // hobby: PropTypes.array,
  // add_education: PropTypes.array,
};

export default AdvEducation;
