/* eslint-disable indent */
/* eslint-disable multiline-ternary */
import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import journalsService from "../services/journals.service";
// import Preloader from "../components/ui/preloader";
import { toast } from "react-toastify";

const GetHomeworkContext = React.createContext();

export const useGetHomework = () => useContext(GetHomeworkContext);

export const GetHomeworkProvider = ({ children, date, journalsId }) => {
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dateHomeworks, setDateHomeworks] = useState([]);

  useEffect(() => {
    if (date && journalsId) {
      getHomeworksByDate(date, JSON.stringify(journalsId));
    }
    return () => {
      setDateHomeworks([]);
    };
  }, [date, journalsId]);

  useEffect(() => {
    if (error !== null) {
      toast.error(error);
      setError(null);
    }
  }, [error]);

  async function getHomeworksByDate(date, journalsId) {
    // console.log(date, journalsId);
    try {
      const content = await journalsService.getHomeworksByDate(
        date,
        journalsId
      );
      setDateHomeworks(content);
      setLoading(false);
    } catch (error) {
      errorCather(error);
    }
  }

  function errorCather(error) {
    const { message } = error.response.data;
    setError(message);
    setLoading(false);
  }

  return (
    <GetHomeworkContext.Provider
      value={{
        dateHomeworks,
        getHomeworksByDate,
      }}
    >
      {
        !isLoading ? children : ""
        // <>
        //   <div className="w-full h-[400px]"></div>
        //   <Preloader />
        // </>
      }
    </GetHomeworkContext.Provider>
  );
};

GetHomeworkProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  date: PropTypes.any,
  journalsId: PropTypes.array,
};
