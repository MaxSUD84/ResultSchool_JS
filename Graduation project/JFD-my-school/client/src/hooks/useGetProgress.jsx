/* eslint-disable indent */
/* eslint-disable multiline-ternary */
import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import progressService from "../services/progress.service";
import Preloader from "../components/ui/preloader";
import { toast } from "react-toastify";

const GetProgressContext = React.createContext();

export const useGetProgress = () => useContext(GetProgressContext);

export const GetProgressProvider = ({
  children,
  startDate,
  endDate,
  learnerId,
}) => {
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dateProgress, setDateProgress] = useState([]);

  useEffect(() => {
    if (startDate && endDate && learnerId) {
      getProgressTimePeriod({ startDate, endDate, learnerId });
    }
  }, [startDate, endDate, learnerId]);

  useEffect(() => {
    if (error !== null) {
      toast.error(error);
      setError(null);
    }
  }, [error]);

  async function getProgressTimePeriod(obj) {
    setLoading(true);
    try {
      const content = await progressService.getProgressTimePeriod(obj);
      setDateProgress(content);
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
    <GetProgressContext.Provider
      value={{
        isLoading,
        dateProgress,
        getProgressTimePeriod,
      }}
    >
      {!isLoading ? (
        children
      ) : (
        <>
          <div className="w-full h-[400px]"></div>
          <Preloader />
        </>
      )}
    </GetProgressContext.Provider>
  );
};

GetProgressProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  startDate: PropTypes.any,
  endDate: PropTypes.any,
  learnerId: PropTypes.string,
};
