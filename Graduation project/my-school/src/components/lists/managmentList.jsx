/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import style from "../../styles/styles";
import { paginate } from "../../utils/paginate";
import _ from "lodash";

import PersonalCard from "../cards/personalCard";
import { useTeachers } from "../../hooks/useTeachers";

const ManagmentList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSubject, setSelectedSubject] = useState();
  const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
  const [searchField, setSearchField] = useState("");
  const pageSize = 6;

  const { teachers } = useTeachers();

  const handleSort = (item) => {
    setSortBy(item);
  };

  if (teachers) {
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
    const teachersCrop = paginate(sortedTeachers, currentPage, pageSize);

    console.log(teachersCrop);

    const count = teachersCrop.length;
  }
  // const count = filteredUsers.length;
  const clearFilter = () => {
    // setSelectedProf();
  };

  return <PersonalCard />;
};

export default ManagmentList;
