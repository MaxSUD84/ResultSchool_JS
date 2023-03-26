import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GetHomeworkProvider } from "../../hooks/useGetHomework";
// import PropTypes from 'prop-types'

// Service
import timetableService from "../../services/timetable.service";

// Store
import { getCurrentUserData } from "../../store/authUser";
import {
  isAllClassJournalsLoaded,
  loadClassJournals,
  getClassJournalsByClassId,
} from "../../store/classJournals";

// Component
import DayPicker from "../elems/dayPicker";
import HomeTasks from "../lists/homeTasks";

const WeeklyHomeworks = () => {
  const dispatch = useDispatch();
  const curUserData = useSelector(getCurrentUserData());
  const [wTimetable, setWTimetable] = useState([]);
  const [startDay, setStartDay] = useState();
  const classJournal = useSelector(
    getClassJournalsByClassId(curUserData.uuid_class)
  );
  const isClassJournalsLoaded = useSelector(isAllClassJournalsLoaded());
  const [pickDay, setPickDay] = useState({});

  useEffect(() => {
    setStartDay("2023-03-13T03:00:00");
    if (!isClassJournalsLoaded) {
      dispatch(loadClassJournals());
    }
  }, []);

  useEffect(() => {
    async function fetch(classId) {
      return await timetableService.get(classId);
    }

    if (curUserData && curUserData.uuid_class) {
      fetch(curUserData.uuid_class).then((res) => setWTimetable(res));
    }
  }, [curUserData]);

  const handlePickedDay = (date) => {
    if (wTimetable && classJournal) {
      const cDay = date.getDay() === 0 ? 6 : date.getDay() - 1;
      // console.log(cDay, wTimetable);
      const subjects = [
        ...wTimetable[cDay].lessons.map((sub_name) => sub_name?.subject),
      ];
      const journals = [
        ...subjects.map(
          (sub_name) =>
            classJournal?.progress_journal?.find(
              (subJourLink) => subJourLink.subject === sub_name
            )?.uuid_subject_journal
        ),
      ];
      const pickedData = {
        date: date,
        journalsId: journals,
        subjects: subjects,
      };
      // console.log(pickedData);
      setPickDay(pickedData);
    }
  };

  return (
    <div>
      <div>
        <DayPicker startDay={startDay} handlePickedDay={handlePickedDay} />
        <GetHomeworkProvider {...pickDay}>
          <HomeTasks {...pickDay} />
        </GetHomeworkProvider>
      </div>
    </div>
  );
};

// WeeklyHomeworks.propTypes = {}

export default WeeklyHomeworks;
