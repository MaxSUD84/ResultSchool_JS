import React, {useState} from "react";
import { episodes, fetchAll, fetchYears } from "../fakeApi/episodesApi";
import { paginate } from "../utils/paginate"
import GroupList from "./groupList";
import Episode from "./episode"; // Импорт компонента 
import Pagination from "./pagination";
import { useEffect } from "react";
import { filter } from "lodash";

const EpisodesList = () => {
  const count = episodes.length; // количество записей
  const pageSize = 6; // количество записей на странице, которое хотим выводить

  const [currentPage, setCurrentPage] = useState(1);

  const [_years, _setYears] = useState([]);
  const [_filter, _setFilter] = useState();
  const [_episodes, _setEpisodes] = useState([]);

  // Функция для получения эпизодов
  const getEpisodes = (year) => {
    // Вернет все эпизоды, фильтрация пока не работает
    fetchAll(year).then((response)  => _setEpisodes(response));
    setCurrentPage(1);
  };

  // Запрашиваем список эпизодов когда меняется фильтр
  useEffect(() => {
    getEpisodes(_filter);
  }, [_filter]);

  useEffect(() => {
    fetchYears().then((response) => _setYears(response));
  }, []);

  // Функция для установки фильтра
  const handleFilterChange = (filter) => {
    _setFilter(filter);
  };

  // Принимает pageIndex 
  const handlePageChange = (pageIndex) => {
    // console.log(pageIndex);
    setCurrentPage(pageIndex);
  }

  const episodesCrop = paginate(episodes, currentPage, pageSize);

  return (
    <div className="container pt-2">
      <div className="row">
        <div className="col-4">
          <GroupList
            items={_years}
            filter={_filter}
            onChangeFilter={handleFilterChange}
          />
        </div>
      </div>
      <div className="col-8">
        <div className="row">
          {episodesCrop.map((episode) => (
            <Episode key={episode.id} {...episode} />
          ))}
        </div>
        <div className="row">
          <Pagination
            itemsCount={count}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div> 
      </div>
    </div>
  );
};

export default EpisodesList;