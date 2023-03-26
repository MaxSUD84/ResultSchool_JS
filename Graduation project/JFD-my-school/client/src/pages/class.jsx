/* eslint-disable no-unused-vars */
/* eslint-disable multiline-ternary */
import { useState, useEffect } from "react";
// import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import _ from "lodash";

// Components
import Preloader from "../components/ui/preloader";
import LearnersTable from "../components/ui/learnersTable";

// Store
import { getClassesLoadingStatus, getClassById } from "../store/classes";
import { getCurrentUserData } from "../store/authUser";

// Service
import localStorageService from "../services/localStorage.service";

// Styles
import style from "../styles/styles";

const Class = () => {
  const curUserCfg = localStorageService.getUserId();
  const { classId } = useParams();
  const [curClassId, setCurClassId] = useState("");
  const [fullClassData, setFullClassData] = useState({});
  const [teachers, setTeachers] = useState([]);
  const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });

  const isClassDataLoading = useSelector(getClassesLoadingStatus());
  const curClassData = useSelector(getClassById(curClassId));
  const curUserData = useSelector(getCurrentUserData());

  useEffect(() => {
    if (classId && !curClassId) {
      setCurClassId(classId);
    }
  }, [classId]);

  if (isClassDataLoading || JSON.stringify(curClassData) === "{}") {
    return (
      <>
        <div className="w-full h-[400px]"></div>
        <Preloader />
      </>
    );
  }

  function RandomMark() {
    return (Math.random() * 3 + 2).toFixed(2);
  }
  // console.log(curClassData);

  if (curClassData && JSON.stringify(fullClassData) === "{}") {
    // let learners = [];
    let learners = curClassData.list_learners.map((data, ind) => {
      let learnData;
      const value = Object.values(data)[0];
      learnData = {
        _id: value._id,
        num: ind + 1,
        name: `${value.last_name} ${value.first_name}`,
        image: value.image,
        mathematics: RandomMark(),
        russianLanguage: RandomMark(),
        literature: RandomMark(),
        englishLanguage: RandomMark(),
        physics: RandomMark(),
        biology: RandomMark(),
        academic_progress_sum: value.academic_progress_sum,
      };
      return learnData;
    });
    setFullClassData(learners);

    let teachers = [
      {
        _id: curClassData.mentor._id,
        name: curClassData.mentor.full_name,
        role: "Классный руководитель: ",
      },
    ];

    curClassData.subject_teachers.forEach((obj) => {
      const teacher = Object.values(obj)[0];
      teachers.push({
        _id:
          teacher._id !== curClassData.mentor._id
            ? teacher._id
            : teacher._id + "CZYE",
        name: teacher.full_name,
        role: `Учитель по предмету: ${teacher.subject}`,
      });
    });
    setTeachers(teachers);
  }

  // console.log(fullClassData);

  const sortedClassData = _.orderBy(
    fullClassData,
    [sortBy.path],
    [sortBy.order]
  );

  const handleSort = (item) => {
    setSortBy(item);
  };

  return (
    <section className={`${style.flexCenterCol} mb-6`}>
      <div className={`${style.boxWidth} ${style.paddingX}`}>
        <LearnersTable
          learners={sortedClassData}
          onSort={handleSort}
          selectedSort={sortBy}
          isMentor={classId === curUserData.uuid_mentor}
          isTeacher={curUserCfg.isTeacher}
          teacherSubject={curUserData.subject || ""} //
        />
        <div className="h-[2px] my-1 bg-primary-2" />
        {teachers.length ? (
          <div className="flex flex-col gap-2">
            {teachers.map((teacher) => {
              return (
                <NavLink
                  key={teacher._id}
                  to={`../teacher/${teacher._id}`}
                  className={`
                  flex flex-row justify-between p-3
                  border-2 bg-slate-50 ring-1 ring-slate-200 rounded-md
                  hover:bg-green-100 hover:ring-green-800 hover:shadow-md hover:shadow-green-500 
                `}
                >
                  <p className="px-3">{teacher.role}</p>
                  <p>{teacher.name}</p>
                </NavLink>
              );
            })}
          </div>
        ) : (
          ""
        )}
      </div>
    </section>
  );
};

export default Class;
