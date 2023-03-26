/* eslint-disable multiline-ternary */
import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import journalsService from "../services/journals.service";
import Preloader from "../components/ui/preloader";
import { toast } from "react-toastify";

const HomeworkContext = React.createContext();

export const useHomework = () => useContext(HomeworkContext);

export const HomeworkProvider = ({ children, uuid_hw }) => {
  const [isLoading, setLoading] = useState(true);
  const [homeworks, setHomeworks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getHomeworksList(uuid_hw);
  }, [uuid_hw]);

  useEffect(() => {
    if (error !== null) {
      toast.error(error);
      setError(null);
    }
  }, [error]);

  // Function

  async function getHomeworksList(uuid_hw) {
    const hw_les = [];
    try {
      if (Array.isArray(uuid_hw)) {
        await Promise.all(
          uuid_hw.map(async (uuid) => {
            const content = await journalsService.getHomeworkById(uuid);
            hw_les.push(content);
          })
        );
      } else {
        const content = await journalsService.getHomeworkById(uuid_hw);
        hw_les.push(content);
      }

      setHomeworks(hw_les);
      setLoading(false);
    } catch (error) {
      errorCather(error);
    }
  }

  async function putNewHomework(obj) {
    setLoading(true);
    try {
      const content = await journalsService.putNewHomework(obj);
      setHomeworks((p) => {
        return [...p, content];
      });
      setLoading(false);
    } catch (error) {
      errorCather(error);
    }
  }

  async function postEditHomework(obj) {
    setLoading(true);
    try {
      await journalsService.postEditHomework(obj);
      setHomeworks((p) => {
        const newValue = p.map((el) => (el._id == obj._id ? obj : el));
        return newValue;
      });
      setLoading(false);
    } catch (error) {
      errorCather(error);
    }
  }

  async function deleteHomework(hd_id) {
    setLoading(true);
    try {
      await journalsService.deleteHomework(hd_id);
      setHomeworks((p) => p.filter((el) => el._id != hd_id));
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
    <HomeworkContext.Provider
      value={{
        homeworks,
        putNewHomework,
        postEditHomework,
        deleteHomework,
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
    </HomeworkContext.Provider>
  );
};

HomeworkProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  uuid_hw: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
};
