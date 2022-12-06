/* eslint-disable no-unused-vars */
import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import teachersService from "../services/teachers.service";
import { toast } from "react-toastify";

const TeachersContext = React.createContext();

export const useTeachers = () => useContext(TeachersContext);

export const TeacherProvider = ({ children }) => {
  const [teachers, setTeachers] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getTeachers();
  }, []);

  useEffect(() => {
    if (error !== null) {
      toast.error(error);
      setError(null);
    }
  }, [error]);

  async function getTeachers() {
    try {
      const content = await teachersService.get();
      console.log(content);
      setTeachers(content);
      setLoading(false);
    } catch (error) {
      errorCather(error);
    }
  }

  function errorCather(error) {
    const { message } = error.response.data;
    setError(message);
  }

  return (
    <TeachersContext.Provider value={{ teachers, getTeachers }}>
      {!isLoading ? children : "Loading..."}
    </TeachersContext.Provider>
  );
};
TeacherProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};
