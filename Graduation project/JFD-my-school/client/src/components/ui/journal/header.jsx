/* eslint-disable multiline-ternary */
/* eslint-disable indent */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import PropTypes from "prop-types";

// Icons
import {
  FaChartLine,
  FaBookOpen,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

const JournalHeader = ({ topics, activeLesson, changeLesson, changeTable }) => {
  const [hwActive, setHwActive] = useState(false);
  const [startTopic, setStartTopic] = useState(0);

  // выводим темы уроков
  let countTopic = 4;
  let endTopic =
    topics.length > startTopic + countTopic
      ? startTopic + countTopic
      : topics.length;
  const handleStTopicMinus = () => {
    setStartTopic(startTopic ? startTopic - 1 : 0);
  };
  const handleStTopicPlus = () => {
    setStartTopic(
      startTopic + countTopic + 1 < topics.length
        ? startTopic + 1
        : topics.length - countTopic
    );
  };

  const topicShortArr = topics.slice(startTopic, endTopic);

  const handleChangeTable = () => {
    setHwActive((p) => {
      const newValue = !p;
      changeTable(newValue ? "progress" : "homework");
      return newValue;
    });
  };

  const handleChangeLesson = (lesson_id) => {
    changeLesson(lesson_id);
  };

  return (
    <div
      className={`
        flex flex-row flex-nowrap justify-start items-center 
        h-10 w-full py-2 mt-2
      `}
    >
      {/* // Ячейка для первой колонки */}
      <div
        className={`
        ${hwActive ? "w-14" : "w-60"}
        flex flex-row items-center
        border-b-2 border-r-2 border-spacing-2 border-b-blue-500 border-r-green-500
        font-body font-semibold
        `}
      >
        <button
          className={`
          w-10 h-10 p-2 m-2 rounded-md
          ${hwActive ? "bg-green-50" : "bg-purple-50"}
          ring-1 ring-primary-1 shadow-md shadow-purple-400
          hover:shadow-green-400 hover:ring-green-700 hover:ring-1
          `}
          type="button"
          onClick={handleChangeTable}
        >
          {hwActive ? (
            <FaBookOpen className="w-6 h-6" />
          ) : (
            <FaChartLine className="w-6 h-6" />
          )}
        </button>
        {!hwActive ? (
          <p className="flex flex-row justify-center w-full">Ученик</p>
        ) : (
          ""
        )}
      </div>
      <div
        className="
        w-full flex flex-row justify-between items-center 
        border-b-2 border-spacing-2 border-b-blue-500"
      >
        {startTopic !== 0 ? (
          <FaChevronLeft
            className={`
            w-8 h-10 p-2 m-2 cursor-pointer
            ring-1 ring-primary-1 shadow-md shadow-purple-400 rounded-md
            hover:shadow-green-400 hover:ring-green-700 hover:ring-1
          `}
            onClick={handleStTopicMinus}
          />
        ) : (
          <FaChevronLeft
            className={`
            w-8 h-10 p-2 m-2 cursor-arrow
            ring-2  shadow-md shadow-slate-400 rounded-md
            ring-slate-400 bg-slate-300 text-slate-400
            `}
          />
        )}
        <div className="w-full flex flex-start px-3">
          {topicShortArr.map(({ lesson_title }) => {
            return (
              <div
                key={lesson_title._id}
                className={`
                ${
                  activeLesson === lesson_title._id
                    ? "bg-green-200 ring-1 ring-green-400 rounded-t-md"
                    : ""
                }
                font-body font-semibold flex items-center
                h-10 px-4 my-2 break-words leading-tight text-center
                select-none cursor-pointer
              `}
                onClick={() => handleChangeLesson(lesson_title._id)}
              >
                {lesson_title.lesson}
              </div>
            );
          })}
        </div>
        {endTopic !== topics.length ? (
          <FaChevronRight
            className={`
            w-8 h-10 p-2 m-2 cursor-pointer
            ring-1  shadow-md shadow-purple-400 rounded-md
            hover:shadow-green-400 hover:ring-green-700 hover:ring-1
            disabled:ring-slate-500 disabled:bg-slate-200 disabled:text-slate-500
          `}
            onClick={handleStTopicPlus}
          />
        ) : (
          <FaChevronRight
            className={`
            w-8 h-10 p-2 m-2 cursor-arrow
            ring-2  shadow-md shadow-slate-400 rounded-md
            ring-slate-400 bg-slate-300 text-slate-400
            `}
          />
        )}
      </div>
    </div>
  );
};

JournalHeader.propTypes = {
  topics: PropTypes.array,
  activeLesson: PropTypes.string,
  changeTable: PropTypes.func,
  changeLesson: PropTypes.func,
};

export default JournalHeader;
