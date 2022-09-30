import React, {useState, useEffect} from "react";
import { fetchAll, fetchYears } from "../fakeApi/episodesApi";
import { paginate } from "../utils/paginate"
import GroupList from "./groupList";
import Episode from "./episode"; // Импорт компонента 
import Pagination from "./pagination";
// import { filter } from "lodash";

const EpisodesList = () => {
  const [episodes, setEpisodes] = useState([]);
  const [years, setYears] = useState([]);
  const [filter, setFilter] = useState();

  const count = episodes.length; // количество записей
  const pageSize = 6; // количество записей на странице, которое хотим выводить
  const [currentPage, setCurrentPage] = useState(1);

  // Принимает pageIndex 
  const handlePageChange = (pageIndex) => {
    // console.log(pageIndex);
    setCurrentPage(pageIndex);
  }

  const pageEpisodes = paginate(episodes, currentPage, pageSize);

  // Функция для получения эпизодов
  const getEpisodes = (year) => {
    // Вернет все эпизоды, фильтрация пока не работает
    fetchAll(year).then((response)  => setEpisodes(response));
    setCurrentPage(1);
  };

  // Запрашиваем список эпизодов когда меняется фильтр
  useEffect(() => {
    getEpisodes(filter);
  }, [filter]);

  useEffect(() => {
    // Сброс фильтра через дополнительную кнопку
    // fetchYears().then((response) => setYears([...response, {text: "Все эпизоды"}])); 
    fetchYears().then((response) => setYears(response));
  }, []);

  // Функция для установки фильтра
  const handleFilterChange = (filter) => {
    setFilter(filter);
  };

  // Функция сброса фильтра
  const handleReset = () => { setFilter(); }

// <div className="d-flex flex-column flex-shrink-0 p-3">

  return (
    <div className="container pt-2">
      <div className="row">
        <div className="col-4">
          {
            !!years.length && (
              <div>
                <GroupList
                  items={years}
                  filter={filter}
                  onChangeFilter={handleFilterChange}
                />
                <hr />
                <div className="d-grid">
                  <button
                    onClick={handleReset}
                    className="btn btn-m btn-primary"
                  >
                    Очистить
                  </button>
                </div>
              </div>
            )}
        </div>
        <div className="col-8">
          <div className="row">
            {pageEpisodes.map((episode) => (
              <Episode key={episode.id} {...episode} />
            ))}
          </div>
          <div className="row justify-content-center">
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
  );
};

export default EpisodesList;