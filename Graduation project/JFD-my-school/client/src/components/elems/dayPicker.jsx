/* eslint-disable indent */
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { nanoid } from "nanoid";

function addDay(startDate, DayToAdd) {
  const newDate = new Date(startDate);
  newDate.setDate(newDate.getDate() + DayToAdd);
  return {
    id: nanoid(),
    date: new Date(newDate),
    isActive: false,
  };
}
const DayPicker = ({ startDay, handlePickedDay }) => {
  const [twoWeeks, setTwoWeeks] = useState([]);

  useEffect(() => {
    if (startDay) {
      const updTwoWeeks = _.fill(Array(14), {}).map((day, ind) =>
        addDay(startDay, ind)
      );
      setTwoWeeks(updTwoWeeks);
    }
  }, [startDay]);

  const handleClick = (day) => {
    setTwoWeeks((p) => p.map((d) => ({ ...d, isActive: d.date === day })));
    handlePickedDay(day);
  };

  return (
    <div>
      <div className="flex flex-row justify-between items-center mx-2">
        <p className="text-lg font-body font-semibold">Выберите дату:</p>
        <p className="text-lg font-body font-semibold">Март</p>
      </div>
      <div className={`flex flex-row justify-center items-center gap-2`}>
        {twoWeeks &&
          twoWeeks.map((d, i) => {
            const dayStyle = d.isActive ? 5 : i % 7 == 5 || i % 7 == 6 ? 2 : 1;
            return (
              <div
                key={d.id}
                className={`
            hidden lg:flex flex-col
            shadow-md hover:shadow-green-300 
            ${
              dayStyle == 5
                ? "shadow-green-300 bg-green-200"
                : dayStyle == 2
                ? "shadow-red-300 bg-red-100"
                : "shadow-slate-400  bg-slate-100"
            }
            ring-1 ring-zinc-400                       
            rounded
            w-20 h-20
            my-3
        `}
                onClick={() => handleClick(d.date)}
              >
                <p className="flex justify-end items-start p-2 font-semibold text-2xl text-slate-500">
                  {d.date.getDate()}
                </p>
              </div>
            );
          })}
      </div>
    </div>
  );
};

DayPicker.propTypes = {
  startDay: PropTypes.string,
  handlePickedDay: PropTypes.func,
};

export default DayPicker;
