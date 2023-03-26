/* eslint-disable multiline-ternary */
import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import teachersService from "../services/teachers.service";
import Preloader from "../components/ui/preloader";
import { toast } from "react-toastify";

const TeacherContext = React.createContext();

export const useTeacher = () => useContext(TeacherContext);

export const TeacherProvider = ({ children }) => {
  const [isLoading, setLoading] = useState(true);
  const [teachers, setTeachers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getTeachersList();
  }, []);

  useEffect(() => {
    if (error !== null) {
      toast(error);
      setError(null);
    }
  }, [error]);

  // Function

  async function getTeachersList() {
    try {
      const content = await teachersService.get();
      setTeachers(content);
      setLoading(false);
    } catch (error) {
      errorCather(error);
    }
  }

  function errorCather(error) {
    const { message } = error.response.data;
    setError(message);
    // setLoading(false);
  }

  return (
    <TeacherContext.Provider value={{ teachers }}>
      {!isLoading ? (
        children
      ) : (
        <>
          <div className="w-full h-[400px]"></div>
          <Preloader />
        </>
      )}
      {/* {children} */}
    </TeacherContext.Provider>
  );
};

TeacherProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};
