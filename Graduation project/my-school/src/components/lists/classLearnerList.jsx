/* eslint-disable no-unused-vars */
// import React from 'react'
import { useEffect } from "react";
import PropTypes from "prop-types";
import style from "../../styles/styles";

import { useDispatch, useSelector } from "react-redux";
import { getClassById } from "../../store/classes";
import {
  getAllDataStatus,
  getLearners,
  loadClassLearnersList,
} from "../../store/learners";
import { getTeachers, loadClassTeachersList } from "../../store/teachers";

const ClassLearnerList = ({ class_uuid }) => {
  const lernClass = useSelector(getClassById(class_uuid));
  //   const allLearnerLoaded = useSelector(getAllDataStatus());
  const classLearner = useSelector(getLearners());
  const classTeachers = useSelector(getTeachers());

  const dispatch = useDispatch();

  useEffect(() => {
    if (lernClass) {
      dispatch(loadClassLearnersList(lernClass.learners_list));

      const teachersList = lernClass.study_program.map(
        (sub) => sub.teacher_uuid
      );
      dispatch(loadClassTeachersList(teachersList));
    }
  }, []);

  if (!lernClass) return "Loading current class data";
  if (!classLearner) return "Loading class learners data";
  if (!classTeachers) return "Loading class teachers data";

  return (
    <>
      <div
        className={`
            ${style.boxWidth} ${style.paddingX}
            flex flex-col justify-center
            m-2
        `}
      >
        {/* *** Ученики *** */}
        <p
          className={`
                flex justify-center
                font-body font-semibold text-xl underline
                px-1
            `}
        >
          Ученики:
        </p>
        <ol
          className={`
                flex flex-row flex-wrap justify-center
                m-4 
                gap-3 
            `}
        >
          {classLearner.map((lern) => {
            return (
              <li
                className={`
                    flex flex-row items-center justify-start
                    w-fit basis-1/6
                    ring-1 ring-slate-400 rounded-md
                    shadow shadow-purple-500
                `}
                key={lern.uuid}
              >
                <img
                  src={`https://avatars.dicebear.com/api/avataaars/${(
                    Math.random() + 1
                  )
                    .toString(36)
                    .substring(7)}.svg`}
                  className={`
                                xl:block hidden
                                ring-1 ring-primary-500
                                m-3 rounded-full
                            `}
                  alt="avatar"
                  width="75"
                  height="75"
                />
                <p
                  className={`
                    flex
                    md:p-1 md:justify-start 
                    px-3 justify-center
                    text-ellipsis
                `}
                >
                  {lern.first_name} {lern.last_name}
                </p>
              </li>
            );
          })}
        </ol>
        {/* *** Учителя *** */}
        <p
          className={`
                flex justify-center
                font-body font-semibold text-xl underline
                px-1
            `}
        >
          Учителя:
        </p>
        <ol
          className={`
                flex flex-row flex-wrap justify-center
                m-4 
                gap-3 
            `}
        >
          {classTeachers.map((teacher) => {
            return (
              <>
                <li
                  className={`
                    flex flex-row justify-center items-start
                    w-fit basis-1/5
                    ring-1 ring-slate-400 rounded-md
                    shadow shadow-purple-500
                `}
                  key={teacher.uuid}
                >
                  <img
                    src={`https://avatars.dicebear.com/api/avataaars/${(
                      Math.random() + 1
                    )
                      .toString(36)
                      .substring(7)}.svg`}
                    className={`
                                xl:block hidden
                                ring-1 ring-primary-500
                                m-3 rounded-full
                            `}
                    alt="avatar"
                    width="75"
                    height="75"
                  />
                  <div
                    className={`
                        flex flex-col w-full
                    `}
                  >
                    <div className="flex flex-row justify-end items-end">
                      <p
                        className={`
                        w-fit
                        bg-primary-2 rounded-tr-md rounded-bl-md
                        font-semibold text-xs text-primary-42
                        px-2 py-1 
                    `}
                      >
                        {teacher.subject}
                      </p>
                    </div>

                    <p
                      className={`
                    flex
                    md:p-1 md:justify-start 
                    px-3 justify-center
                    text-ellipsis
                `}
                    >
                      {teacher.full_name}
                    </p>
                  </div>
                </li>
              </>
            );
          })}
        </ol>
      </div>
    </>
  );
};

ClassLearnerList.propTypes = {
  class_uuid: PropTypes.string.isRequired,
};

export default ClassLearnerList;
