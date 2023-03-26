/* eslint-disable indent */
/* eslint-disable multiline-ternary */
import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import staticService from "../services/static.service";
// import Preloader from "../components/ui/preloader";
import { toast } from "react-toastify";

const StaticContext = React.createContext();

export const useStatic = () => useContext(StaticContext);

export const StaticProvider = ({ children }) => {
  const [isLoadingNews, setLoadingNews] = useState(true);
  const [isLoadingEvents, setLoadingEvents] = useState(true);
  //   const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [news, setNews] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getNews();
    getEvents();
    // setLoading(isLoadingNews && isLoadingEvents);
  }, []);

  const isLoading = isLoadingNews || isLoadingEvents;

  useEffect(() => {
    if (error !== null) {
      toast.error(error);
      setError(null);
    }
  }, [error]);

  async function getNews() {
    setLoadingNews(true);
    try {
      const content = await staticService.getNews();
      setNews(content);
      setLoadingNews(false);
    } catch (error) {
      errorCather(error);
    }
  }

  async function getEvents() {
    setLoadingEvents(true);
    try {
      const content = await staticService.getEvents();
      setEvents(content);
      setLoadingEvents(false);
    } catch (error) {
      errorCather(error);
    }
  }

  function errorCather(error) {
    const { message } = error.response.data;
    setError(message);
    setLoadingEvents(false);
    setLoadingNews(false);
  }

  return (
    <StaticContext.Provider
      value={{
        news,
        events,
      }}
    >
      {!isLoading ? children : ""}
    </StaticContext.Provider>
  );
};

StaticProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};
