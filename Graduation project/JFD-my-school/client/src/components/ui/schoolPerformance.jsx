import { useState } from "react";
// import PropTypes from 'prop-types'
import { useSelector } from "react-redux";

// Component
import DateSlider from "../elems/dateSlider";
import TwoWeekProgress from "./journal/twoWeekProgress";

// Utils
// import { getTextNameMonth } from "../../utils/dateCalculation";

// Hooks
import { GetProgressProvider } from "../../hooks/useGetProgress";

//Store
import { getCurrentUserData } from "../../store/authUser";

// Style
import style from "../../styles/styles";

// ==============================================================

const SchoolPerformance = () => {
  const timePeriod = 14;
  const curUser = useSelector(getCurrentUserData());
  // *** Изменение временного периода ***
  const [startDate, setStartDate] = useState(new Date("2023-03-13T03:00:00Z"));

  let lastDate = new Date(startDate);
  lastDate.setDate(startDate.getDate() + 14);

  const handlerDateSliderLeftClk = (date, days) => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() - days);
    setStartDate(newDate);
  };

  const handlerDateSliderRigthClk = (date, days) => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + days);
    setStartDate(newDate);
  };
  // ***

  return (
    <div className={`${style.boxWidth}`}>
      <DateSlider
        leftLabel={startDate.toLocaleDateString()}
        rigthLabel={lastDate.toLocaleDateString()}
        // middleLabel={getTextNameMonth(startDate.getMonth())}
        handlerLeftClk={() => handlerDateSliderLeftClk(startDate, timePeriod)}
        handlerRigthClk={() => handlerDateSliderRigthClk(startDate, timePeriod)}
      />
      {curUser?._id && (
        <GetProgressProvider
          startDate={startDate}
          endDate={lastDate}
          learnerId={curUser?._id}
        >
          <TwoWeekProgress days={timePeriod} startDate={startDate} />
        </GetProgressProvider>
      )}
    </div>
  );
};

SchoolPerformance.propTypes = {};

export default SchoolPerformance;
