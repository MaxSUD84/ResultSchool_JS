/* eslint-disable indent */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import style from "../../styles/styles";
import { paginate } from "../../utils/paginate";
import _ from "lodash";

import PersonalCard from "../cards/personalCard";
import Pagination from "../elems/pagination";
import { useTeachers } from "../../hooks/useTeachers";
import Title from "../articles/title";

const ManagmentList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSubject, setSelectedSubject] = useState();
  const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
  const [searchField, setSearchField] = useState("");
  const pageSize = 8;
  let teachersCrop = [];

  const { teachers } = useTeachers();

  // console.log(teachers);

  // const handleSort = (item) => {
  //   setSortBy(item);
  // };

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

  // if (teachers) { }
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
          <div className={""}>
            <div className="py-4 px-6">
              <Title title_1={"Наши учетеля"} />
            </div>

            <div className={`flex flex-wrap justify-evenly gap-4 px-6`}>
              {teachersCrop.map((teacher) => {
                return <PersonalCard key={teacher.uuid} {...teacher} />;
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
      </div>
    </>
  );
};

export default ManagmentList;
