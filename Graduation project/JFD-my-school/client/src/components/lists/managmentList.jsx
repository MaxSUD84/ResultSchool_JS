/* eslint-disable indent */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import _ from "lodash";

// Component
import { paginate } from "../../utils/paginate";
import PersonalCard from "../cards/personalCard";
import Pagination from "../elems/pagination";
import { useTeacher } from "../../hooks/useTeacher";
import Title from "../elems/title";

// Style
import style from "../../styles/styles";

const ManagmentList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSubject, setSelectedSubject] = useState();
  const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
  const [searchField, setSearchField] = useState("");
  const pageSize = 6;
  let teachersCrop = [];

  const { teachers } = useTeacher();

  // При обновлении профессии сбрасываем текущию страницу на 1 стр.
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedSubject]);

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const handleSort = (item) => {
    setSortBy(item);
  };

  const searchMatches = teachers;
  // const searchMatches = searchField
  //   ? teachers.filter((user) =>
  //         new RegExp(searchField.toLowerCase()).test(
  //             user.name.toLowerCase()
  //         )
  //     )
  //   : users;

  const filteredTeachers = selectedSubject
    ? searchMatches.filter(
        (teacher) =>
          JSON.stringify(teacher.subject) ===
          JSON.stringify(selectedSubject.subject)
      )
    : searchMatches;

  const sortedTeachers = _.orderBy(
    filteredTeachers,
    [sortBy.path],
    [sortBy.order]
  );

  teachersCrop = paginate(sortedTeachers, currentPage, pageSize);
  // console.log(teachersCrop);

  const count = sortedTeachers.length;

  const clearFilter = () => {
    // setSelectedProf();
  };

  return (
    <>
      <div className={`${style.flexCenter}`}>
        <div className={`${style.boxWidth} flex-1`}>
          <div className="py-4 px-6">
            <Title title_1={"Наши учетеля"} />
          </div>
          <div className={`flex flex-wrap justify-evenly gap-4 px-6`}>
            {teachersCrop.map((teacher) => {
              return <PersonalCard key={teacher._id} {...teacher} />;
            })}
          </div>
          <div>
            <Pagination
              itemsCount={count}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ManagmentList;
