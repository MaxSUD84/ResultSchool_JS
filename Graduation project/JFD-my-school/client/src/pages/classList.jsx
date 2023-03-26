/* eslint-disable multiline-ternary */
// import PropTypes from "prop-types";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import localStorageService from "../services/localStorage.service";

//Component
import Preloader from "../components/ui/preloader";

// Styles
import style from "../styles/styles";
import { NavLink } from "react-router-dom";

// Store
import { isLoadedCurrentUser, getCurrentUserData } from "../store/authUser";
import { loadClassJournals } from "../store/classJournals";

const ClassList = () => {
  const dispatch = useDispatch();
  const curUserCfg = localStorageService.getUserId();
  const isCurrentUserLoaded = useSelector(isLoadedCurrentUser());
  const user = useSelector(getCurrentUserData());
  let ArrClassName = [];

  // console.log(curUserCfg, isCurrentUserLoaded, user);
  // console.log(user, curUserCfg);

  useEffect(() => {
    dispatch(loadClassJournals());
  }, []);

  if (!isCurrentUserLoaded)
    return (
      <>
        <div className="w-full h-[400px]"></div>
        <Preloader />
      </>
    );

  if (curUserCfg.isTeacher) {
    if (user.uuid_class.length) {
      user.uuid_class.forEach((clsId, ind) => {
        ArrClassName.push({
          name: user.name_class[ind],
          uuid: clsId,
          flag: user.uuid_mentor === clsId ? ["teacher", "mentor"] : "teacher",
        });
      });
    }
    if (user.isMentor) {
      if (!user.uuid_class.includes(user.uuid_mentor)) {
        ArrClassName.push({
          name: user.name_mentor,
          uuid: user.uuid_mentor,
          flag: "mentor",
        });
      }
    }
  } else {
    ArrClassName.push({
      name: user.name_class,
      uuid: user.uuid_class,
      flag: "learner",
    });
  }

  return (
    <section className={`${style.flexCol} items-center mb-6 min-h-[400px]`}>
      <div className={`${style.boxWidth} ${style.paddingX}`}>
        {!ArrClassName.length ? (
          <h1>{`${
            curUserCfg.isTeacher
              ? `Учителю ${user.full_name} классы не назначены!`
              : `${user.last_name} ${user.first_name} не распределен ни в один класс`
          }`}</h1>
        ) : (
          <div className="flex flex-col gap-2 border-3 border-slate-700">
            {ArrClassName.map((cls) => {
              const description = Array.isArray(cls.flag)
                ? `Классный руководитель, Учитель по предмету: ${user.subject}`
                : cls.flag === "mentor"
                ? "Классный руководитель"
                : cls.flag === "teacher"
                ? `Учитель по предмету: ${user.subject}`
                : "Ученик";
              return (
                <NavLink
                  key={cls.uuid + "_" + cls.name}
                  className={`
                      p-5 flex flex-row justify-between items-center
                      border-2 ring-1 rounded-lg shadow-md 
                      ring-primary-2 bg-blue-50 shadow-primary-2
                      focus:bg-blue-100 focus:shadow-purple-800
                      hover:bg-green-50 hover:shadow-green-600 hover:ring-green-900
                  `}
                  to={`../${cls.uuid}`}
                >
                  <p>{`Класс ${cls.name}`}</p>
                  <p>{description}</p>
                </NavLink>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

// ClassList.propTypes = {};

export default ClassList;
