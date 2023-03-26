/* eslint-disable multiline-ternary */
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { nanoid } from "nanoid";
// import _ from "lodash";

// Component
import DayProgress from "../../lists/dayProgress";
import ProgressDayCard from "../../cards/progressDayCard";
import Modal from "../../modals/modal";
import Rating from "../../elems/rating";
import Preloader from "../preloader";

// Hooks
import { useGetProgress } from "../../../hooks/useGetProgress";

// Style
// import style from "../../styles/styles";

// const subjects = [
//   "Математика",
//   "Русский язык",
//   "Литература",
//   "Англиский язык",
//   "Физика",
//   "Биология",
// ];

const TwoWeekProgress = ({ days, startDate }) => {
  const { dateProgress, isLoading } = useGetProgress();

  const [progDayArr, setProgDayArr] = useState([]);
  const [progSummary, setProgSummary] = useState([]);

  const [modalActivate, setModalActivate] = useState(false);
  const [modalContent, setModalContent] = useState();

  useEffect(() => {
    if (!isLoading && dateProgress && days && startDate) {
      const stDate = new Date(startDate);
      const newArr = Array(days)
        .fill({
          id: "",
          day: "",
          dayStyle: 1,
          progRating: "",
        })
        .map((day, ind) => {
          // работаем с датой
          const curDay = new Date(stDate);
          curDay.setDate(stDate.getDate() + ind);
          const curDayOfMonth = curDay.getDate();
          const curDayStyle =
            curDay.getDay() === 0 || curDay.getDay() === 6 ? 2 : 1;
          // Собираем оценки за день
          const arrProgressSub = dateProgress.map((sub) => {
            const findMark = sub.progress.find((marks) => {
              const markDate = marks.date.slice(0, 10);
              return markDate === curDay.toISOString().slice(0, 10);
            });

            return {
              id: nanoid(),
              subject: sub.subjectName,
              mark: findMark?.mark || 0,
            };
          });

          const numMarkPerDay = arrProgressSub.reduce(
            (acc, el) => (acc += el?.mark ? 1 : 0),
            0
          );

          return {
            id: nanoid(),
            day: curDayOfMonth,
            dayStyle: curDayStyle,
            dayProgress: [...arrProgressSub],
            progRating: arrProgressSub.reduce(
              (acc, el) => (acc += +el?.mark / (numMarkPerDay || 1)),
              0
            ),
          };
        });
      // Сгенерируем сущности для отображения результатов по дням
      setProgDayArr(newArr);

      // Сгенерируем сущности для отображения сводных результатов
      const newSummary = dateProgress.map((sub) => ({
        id: nanoid(),
        subject: sub.subjectName,
        rating: sub.avg,
      }));
      setProgSummary(newSummary);
    }
  }, [dateProgress, days, startDate, isLoading]);

  const handleOpenModal = (obj) => {
    setModalContent(obj);
    setModalActivate((p) => !p);
  };

  if (isLoading)
    return (
      <>
        <div className="w-full h-[400px]"></div>
        <Preloader />
      </>
    );

  return (
    <div>
      <div className="flex flex-col justify-center">
        <div
          className="
    flex flex-row flex-wrap gap-2
    "
        >
          {progDayArr.map((d) => {
            return (
              <ProgressDayCard
                key={d.id}
                dayPorgress={d}
                dayStyle={d.dayStyle}
                handleClick={() => handleOpenModal(d)}
              />
            );
          })}
        </div>
        <div
          className={`
        flex flex-col justify-start
        border-t-2 border-spacing-2 border-slate-400
        my-2
    `}
        >
          <p className="font-boby underline underline-offset-4 text-lg p-2">
            Средняя оценка по предметам:
          </p>
          <div
            className={`
            flex md:flex-wrap flex-col
            md:max-h-[80px] h-fit p-4 pt-0
        `}
          >
            {progSummary.map((sumSub) => (
              <div
                key={sumSub.id}
                className={`
            flex flex-row justify-center
            `}
              >
                <p className="font-boby font-semibold text-lg min-w-[200px] px-4">
                  {sumSub.subject}
                </p>
                <Rating value={sumSub.rating} />
              </div>
            ))}
          </div>
        </div>
        <div>
          <Modal active={modalActivate} setActive={setModalActivate}>
            {modalContent?.dayProgress ? <DayProgress {...modalContent} /> : ""}
          </Modal>
        </div>
      </div>
    </div>
  );
};

TwoWeekProgress.propTypes = {
  days: PropTypes.number,
  startDate: PropTypes.object,
};

export default TwoWeekProgress;
