// import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

// Config
import configFile from "../../config.json";

// Components
import Table from "../common/table/table";
import Rating from "../elems/rating";

const LearnersTable = ({
  learners,
  onSort,
  selectedSort,
  isMentor,
  isTeacher,
  teacherSubject,
  // onToggleBookMark,
  //   ...rest
}) => {
  const columns = {
    num: {
      path: "num",
      name: "№",
    },
    name: {
      path: "name",
      name: "Фамилия Имя",
      component: (learner) => {
        // console.log(learner);
        return (
          <NavLink
            className={`flex flex-row items-center`}
            to={`../learner/${learner._id}`}
          >
            <img
              src={configFile.apiEndpoint + learner.image}
              alt=""
              className="h-8 w-8 ring-1 rounded-full mx-2"
            />
            <p>{learner.name}</p>
          </NavLink>
        );
      },
    },
  };

  const varColumns = {
    mathematics: {
      path: "mathematics",
      name: "Математика",
      component: (learner) => <Rating value={learner.mathematics} />,
    },
    russianLanguage: {
      path: "russianLanguage",
      name: "Русский язык",
      component: (learner) => <Rating value={learner.russianLanguage} />,
    },
    literature: {
      path: "literature",
      name: "Литература",
      component: (learner) => <Rating value={learner.literature} />,
    },
    englishLanguage: {
      path: "englishLanguage",
      name: "Англиский язык",
      component: (learner) => <Rating value={learner.englishLanguage} />,
    },
    physics: {
      path: "physics",
      name: "Физика",
      component: (learner) => <Rating value={learner.physics} />,
    },
    biology: {
      path: "biology",
      name: "Биология",
      component: (learner) => <Rating value={learner.biology} />,
    },
  };

  if (isMentor) {
    for (const [key, value] of Object.entries(varColumns)) {
      columns[key] = value;
    }
  } else if (isTeacher) {
    const findSubj = Object.entries(varColumns).find((arr) => {
      const value = arr[1]?.name || "";
      return value === teacherSubject;
    });
    // console.log(teacherSubject, findSubj);
    if (findSubj) {
      columns[findSubj[0]] = findSubj[1];
    }
  }

  columns.academic_progress_sum = {
    path: "academic_progress_sum",
    name: "Cредняя оценка",
    component: (learner) => <Rating value={learner.academic_progress_sum} />,
  };

  return (
    <Table
      onSort={onSort}
      selectedSort={selectedSort}
      columns={columns}
      data={learners}
    />
  );
};

LearnersTable.propTypes = {
  learners: PropTypes.array.isRequired,
  onSort: PropTypes.func,
  selectedSort: PropTypes.object,
  isMentor: PropTypes.bool,
  isTeacher: PropTypes.bool,
  teacherSubject: PropTypes.string,
  // onToggleBookMark: PropTypes.func.isRequired
};

export default LearnersTable;
