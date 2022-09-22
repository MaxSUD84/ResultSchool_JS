import React, {useState} from "react";
import { episodes } from "../fakeStorage/episodes";
import { paginate } from "../utils/paginate"
import Episode from "./episode"; // Импорт компонента 
import Pagination from "./pagination";

const EpisodesList = () => {
  const count = episodes.length; // количество записей
  const pageSize = 6; // количество записей на странице, которое хотим выводить

  const [currentPage, setCurrentPage] = useState(1);

  // Принимает pageIndex 
  const handlePageChange = (pageIndex) => {
    // console.log(pageIndex);
    setCurrentPage(pageIndex);
  }

  const episodesCrop = paginate(episodes, currentPage, pageSize);

  return (
    <div className="container">
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
  );
};

export default EpisodesList;