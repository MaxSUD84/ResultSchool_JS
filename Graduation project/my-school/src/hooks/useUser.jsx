import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import learnersService from "../services/learners.service";
import teachersService from "../services/teachers.service";
import { useSelector } from "react-redux";
import {
  isLoggedInSelector,
  getCurrentUserId,
  isTeacherLogged,
} from "../store/authSlice";
import { toast } from "react-toastify";

const UserContext = React.createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const isLogged = useSelector(isLoggedInSelector());
  const userId = useSelector(getCurrentUserId());
  const isTeacher = useSelector(isTeacherLogged());

  const [user, setUser] = useState({
    name: "",
    image: "",
    _id: "",
  });
  // const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // console.log(isLoading);

  useEffect(() => {
    async function fetchUserData(isTeach) {
      let res;
      if (isTeach) {
        await getTeacherById(userId).then((data) => (res = data));
      } else {
        await getLearnerById(userId).then((data) => (res = data));
      }
      if (res) return res;
    }

    if (isLogged && userId) {
      const userRes = fetchUserData(isTeacher);
      // console.log(isLogged, userId, isTeacher, userRes);
      setUser(userRes);
    }
  }, [isLogged, userId, isTeacher]);

  async function getLearnerById(id) {
    // setLoading(true);
    try {
      const learner = await learnersService.getById(id);
      setUser(learner);
      // setLoading(false);
    } catch (error) {
      errorCather(error);
    }
  }

  async function getTeacherById(id) {
    // setLoading(true);
    try {
      const teacher = await teachersService.getById(id);
      setUser(teacher);
      // setLoading(false);
    } catch (error) {
      errorCather(error);
    }
  }

  useEffect(() => {
    if (error !== null) {
      toast(error);
      setError(null);
    }
  }, [error]);

  function errorCather(error) {
    const { message } = error.response.data;
    setError(message);
    // setLoading(false);
  }

  return (
    <UserContext.Provider value={{ user }}>
      {/* {!isLoading ? children : "Loading..."} */}
      {children}
    </UserContext.Provider>
  );
};
UserProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};
