/* eslint-disable indent */
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

// Component
import Preloader from "../ui/preloader";
// Store
import { getCurrentUserData } from "../../store/authUser";

// Style
import style from "../../styles/styles";

// Service
import timetableService from "../../services/timetable.service";

const WeerlyTimetable = () => {
  const curUserData = useSelector(getCurrentUserData());
  const [wTimetable, setWTimetable] = useState([]);

  useEffect(() => {
    async function fetch(classId) {
      return await timetableService.get(classId);
    }

    if (curUserData && curUserData.uuid_class) {
      fetch(curUserData.uuid_class).then((res) => setWTimetable(res));
    }
  }, [curUserData]);

  if (!wTimetable.length)
    return (
      <>
        <div className="w-full h-[400px]"></div>
        <Preloader />
      </>
    );

  return (
    <div>
      <div
        className={`${style.boxWidth} flex md:flex-row flex-wrap justify-center px-3 gap-3`}
      >
        {wTimetable.map((day, i) => {
          const styleDay = (i + 1) % 7 === 0 || (i + 1) % 7 === 6 ? 2 : 1;
          return (
            <div
              key={day.id}
              className={`
                    flex flex-col
                    ${
                      styleDay === 2
                        ? "bg-red-200 ring-red-600"
                        : "bg-zinc-200 ring-zinc-600"
                    }
                    ring-1 shadow-md shadow-slate-400
                    rounded-md
                    p-3 my-2
                    min-w-[150px]
                `}
            >
              <p
                className={`
                        w-full flex flex-row justify-center
                        border-b-2 border-black 
                        text-xl font-body font-semibold 
                    `}
              >
                {day.label}
              </p>
              {day.lessons.map((les, k) => {
                return (
                  <div
                    key={les.id}
                    className={`
                            w-full flex flex-row justify-start items-end
                            border-b-2 border-slate-400
                        `}
                  >
                    <p className="p-1 text-lg font-semibold">{k + 1}</p>
                    <p className="p-1 text-md font-semibold">{les.subject}</p>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WeerlyTimetable;
