/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

// Components
import Preloader from "../preloader";
import SubTitleBar from "../../elems/subTitleBar";

// Store
import {
  getCurrentUserData,
  isLoadedCurrentUser,
} from "../../../store/authUser";
import {
  loadClassJournals,
  getClassJournalsByClassId,
  isAllClassJournalsLoaded,
} from "../../../store/classJournals";

// Style
import style from "../../../styles/styles";

const ClassJournal = ({ classId }) => {
  const dispatch = useDispatch();
  const isLoadedCurUser = useSelector(isLoadedCurrentUser());
  const curUserData = useSelector(getCurrentUserData());
  const isClassJournalsLoaded = useSelector(isAllClassJournalsLoaded());

  // const classId =
  //   Array.isArray(curUserData.uuid_class) && curUserData.uuid_class.length
  //     ? curUserData.uuid_class[0]
  //     : curUserData.uuid_class;
  const classJournal = useSelector(getClassJournalsByClassId(classId));

  useEffect(() => {
    dispatch(loadClassJournals());
  }, []);

  if (!isClassJournalsLoaded || !isLoadedCurUser) {
    return (
      <>
        <div className="w-full h-[400px]"></div>
        <Preloader />
      </>
    );
  }

  function filtуredJournal(curUserData, classJournal) {
    if (curUserData.uuid_mentor.includes(classJournal.uuid_class)) {
      return classJournal;
    }
    if (curUserData.uuid_class.includes(classJournal.uuid_class)) {
      return {
        ...classJournal,
        progress_journal: classJournal.progress_journal.filter(
          (sub) => sub.subject === curUserData.subject
        ),
      };
    }
    return {
      name_class: "",
      uuid_class: "",
      progress_journal: [],
    };
  }

  const curJournal = filtуredJournal(curUserData, classJournal);

  return (
    <section className={`${style.flexCol} items-center mb-6 min-h-[400px]`}>
      <div className={`${style.boxWidth} ${style.paddingX}`}>
        <SubTitleBar
          userName={"Классый журнал"}
          classTextName={`${curJournal.name_class} класса`}
          classId={curJournal.uuid_class}
        />
        <div
          className={`
            ${style.paddingX}
            flex flex-col gap-3 mt-6
            text-lg font-body font-semibold
          `}
        >
          {curJournal.progress_journal.map((subJournals) => {
            // console.log(subJournals);
            return (
              <NavLink
                key={subJournals._id}
                className={`
                      p-5 flex flex-row justify-start items-center
                      border-2 ring-1 rounded-lg shadow-md 
                      ring-primary-2 bg-blue-50 shadow-primary-2
                      focus:bg-blue-100 focus:shadow-purple-800
                      hover:bg-green-50 hover:shadow-green-600 hover:ring-green-900
                  `}
                to={`../journalSub/${subJournals.uuid_subject_journal}`}
              >
                <p>{`Журнал по предмету ${subJournals.subject}`}</p>
              </NavLink>
            );
          })}
        </div>
      </div>
    </section>
  );
};

ClassJournal.propTypes = {
  classId: PropTypes.string.isRequired,
};

export default ClassJournal;
