/* eslint-disable no-unused-vars */
/* eslint-disable multiline-ternary */
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { nanoid } from "nanoid";
import _ from "lodash";

// Components
import LabelWithDescription from "../elems/labelWithDescription";
import Preloader from "../ui/preloader";

// Hooks
import {
  dateHomeworks,
  getHomeworksByDate,
  useGetHomework,
} from "../../hooks/useGetHomework";

// Style
import styles, { layout } from "../../styles/styles";

const _dayTimeTable = [
  { time: "8:00-8:50", subject: "Англиский язык" },
  { time: "9:00-9:50", subject: "Биология" },
  { time: "10:00-10:50", subject: "Русский язык" },
  { time: "11:00-11:50", subject: "Литература" },
  { time: "12:00-12:50", subject: "Математика" },
];

const HomeTasks = ({ date, subjects }) => {
  // , hTasks, dayTimeTabl
  const { dateHomeworks, getHomeworksByDate } = useGetHomework();
  const [dayTimeTable, setDayTimeTable] = useState([]); // распсание
  const [lastHomeTasks, setLastHomeTasks] = useState([]); // список ДЗ
  const [subject, setSubject] = useState(); // детальная информация по ДЗ
  const [activeListHW, setActiveListHW] = useState(false);
  const [activeHWdetail, setActiveHWdetail] = useState(false);

  // console.log(useHomework());

  const strDate = date?.toLocaleDateString().slice(0, 10);

  // Вывод расписания
  useEffect(() => {
    if (subjects?.length) {
      setDayTimeTable(
        subjects.map((el, ind) => ({
          time: _dayTimeTable[ind].time,
          subject: el,
        }))
      );
    }
    setSubject({
      subject: "Выбери предмет...",
      lastLesson: "",
      homeTasks: "",
    });
    setActiveListHW(false);
    setActiveHWdetail(false);
  }, [date]);

  // Домашнее задание на день
  useEffect(() => {
    if (dateHomeworks && dayTimeTable.length) {
      const hwData = dayTimeTable.map((sub) => {
        const elem = dateHomeworks.find((hw) => hw.subject === sub.subject) || {
          subject: sub.subject,
          subjectId: nanoid(),
          lastLesson: "",
          homeTasks: "Не задано",
        };
        return elem;
      });
      setLastHomeTasks(hwData);
      setActiveListHW(true);
    }
  }, [dateHomeworks, dayTimeTable]);

  // детальная информация по ДЗ
  const handleSubjectPicked = (subName) => {
    const pickedSubject = lastHomeTasks.find((sub) => sub.subject === subName);
    setSubject(pickedSubject);
    setActiveHWdetail(true);
  };

  if (date && !subjects?.length)
    return (
      <div
        className={`${styles.boxWidth} flex-row flex h-[150px] justify-center items-center`}
      >
        <h2 className="font-body text-bold text-4xl">
          {strDate} - выходной день
        </h2>
      </div>
    );

  return (
    <div
      className={`${styles.boxWidth} flex-row flex justify-center ${styles.paddingX}`}
    >
      {date && (
        <div className={`${layout.section}`}>
          {/* расписание уроков */}
          <div
            className={`
            flex flex-col justify-center items-start
            ring-1 ring-slate-400 rounded-l-md 
            shadow-lg shadow-purple-200
            p-4 
            `}
          >
            <div
              className={`
            w-full flex justify-center 
            text-xl font-semibold 
            pb-2 mb-2
            border-b-2 border-spacing-2 border-slate-400
            `}
            >
              <p>{strDate}</p>
            </div>
            <div>
              {dayTimeTable.map((sub) => {
                return (
                  <div
                    className="block pt-2 cursor-pointer"
                    key={sub.time}
                    onClick={() => handleSubjectPicked(sub.subject)}
                  >
                    <LabelWithDescription label={sub.time}>
                      {sub.subject}
                    </LabelWithDescription>
                  </div>
                );
              })}
            </div>
          </div>
          {/* 
        *** расшифровка заданий *** 
        subject: "Математика",
        lastLesson: "Сложение и вычитание натуральных чисел",
        homeTasks: "Учебник стр.50(пересказ), упр.782-789",
        */}
          {activeListHW && lastHomeTasks && (
            <div
              className={`
                ring-1 ring-slate-400 
                shadow-lg shadow-purple-200
                ${activeListHW ? "" : "rounded-r-md"}
                flex flex-col justify-start items-start
                p-4 min-w-[400px]
                `}
            >
              <p
                className={`
                w-full flex justify-center 
                text-xl font-semibold 
                pb-2 mb-2
                border-b-2 border-spacing-2 border-slate-400
                `}
              >
                Домашнее задание
              </p>
              {lastHomeTasks.map((subject, ind) => (
                <div
                  key={subject.subjectId + ind}
                  className={`
              w-full pt-2 mb-2
              border-b-2 border-spacing-2 border-slate-200
              text-sm
              
          `}
                >
                  {subject.homeTasks}
                </div>
              ))}
            </div>
          )}
          {/* 
        *** расшифровка выбранного заданий *** 
        subject: "Математика",
        lastLesson: "Сложение и вычитание натуральных чисел",
        homeTasks: "Учебник стр.50(пересказ), упр.782-789",
        */}
          {activeHWdetail && subject ? (
            <div
              className="
                ring-1 ring-slate-400 rounded-r-md 
                shadow-lg shadow-purple-200
                flex flex-col justify-start items-start
                p-4 min-w-[400px]
                "
            >
              <p
                className={`
                w-full flex justify-center 
                text-xl font-semibold 
                pb-2 mb-2
                border-b-2 border-spacing-2 border-slate-400
                `}
              >
                {subject.subject}
              </p>
              <h4
                className={`w-full flex justify-start text-md font-semibold py-2`}
              >
                {`Тема: ${subject.lastLesson}`}
              </h4>
              <div
                className={`
                w-full h-full
                p-3 
                bg-lime-50
                ring-1 ring-slate-400 rounded
                font-semibold
            `}
              >
                {subject.homeTasks}
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      )}
    </div>
  );
};

HomeTasks.propTypes = {
  date: PropTypes.any,
  journalsId: PropTypes.array,
  subjects: PropTypes.array,
};

export default HomeTasks;
