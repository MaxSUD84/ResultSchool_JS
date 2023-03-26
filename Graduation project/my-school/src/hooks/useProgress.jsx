/* eslint-disable indent */
/* eslint-disable multiline-ternary */
import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import progressService from "../services/progress.service";
import Preloader from "../components/ui/preloader";
import { toast } from "react-toastify";

const ProgressContext = React.createContext();

export const useProgress = () => useContext(ProgressContext);

export const ProgressProvider = ({ children, journalId, lessonId }) => {
  const [isLoading, setLoading] = useState(true);
  const [progress, setProgress] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (journalId && lessonId) {
      getClassProgress({ journalId, lessonId });
    }
  }, [journalId, lessonId]);

  useEffect(() => {
    if (error !== null) {
      toast.error(error);
      setError(null);
    }
  }, [error]);

  // Function

  async function getClassProgress({ journalId, lessonId }) {
    setLoading(true);
    try {
      const content = await progressService.getClassProgress({
        lessonId,
        journalId,
      });

      // Проверяем что сущности Progress созданны
      if (content.length === 0) {
        const newData = await progressService.setClassProgress({
          lessonId,
          journalId,
        });
        setProgress(newData);
        setLoading(false);
        return;
      }
      setProgress(content);
      setLoading(false);
    } catch (error) {
      errorCather(error);
    }
  }

  async function setClassProgress({ journalId, lessonId }) {
    setLoading(true);
    try {
      const content = await progressService.setClassProgress(
        lessonId,
        journalId
      );
      if (content) {
        setProgress(content);
        setLoading(false);
      }
    } catch (error) {
      errorCather(error);
    }
  }

  async function addOrEditMark(obj) {
    // obj = { progressId, journalId, date, task, type, mark,}
    setLoading(true);
    try {
      const content = await progressService.addMarkToProgressById(obj);
      // Обновим значения полей прогресса
      if (content._id) {
        const newData = progress.map((prg) =>
          prg._id === content._id
            ? {
                ...prg,
                progress: content.progress,
                updatedAt: content.updatedAt,
              }
            : prg
        );
        // console.log(newData);
        setProgress(newData);
      }
      setLoading(false);
    } catch (error) {
      errorCather(error);
    }
  }

  async function deleteMark(obj) {
    // obj = { progressId, journalId, deleteMarkId,}
    setLoading(true);
    try {
      const content = await progressService.deleteMarkFromProgressById(obj);
      // Обновим значения полей прогресса
      if (content._id) {
        setProgress((p) =>
          p.map((prg) =>
            prg._id === content._id
              ? {
                  ...prg,
                  progress: content.progress,
                  updatedAt: content.updatedAt,
                }
              : prg
          )
        );
      }
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
    <ProgressContext.Provider
      value={{
        progress,
        getClassProgress,
        setClassProgress,
        addOrEditMark,
        deleteMark,
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
      {/* {children} */}
    </ProgressContext.Provider>
  );
};

ProgressProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  journalId: PropTypes.string,
  lessonId: PropTypes.string,
};
