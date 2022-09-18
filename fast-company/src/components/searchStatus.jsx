import React from "react";

const SearchStatus = ({ length }) => {
  //   console.log("SearchStatus");

  const renderPhrase = (number) => {
    return number && [2, 3, 4].includes(number)
      ? number + " человека тусанут с тобой сегодня"
      : number
      ? number + " человек тусанет с тобой сегодня"
      : "Никто с тобой не тусанет сегодня";
  };

  <span className={"badge p-2 m-2 bg-" + (length ? "primary" : "danger")}>
    {renderPhrase(length)}
  </span>;
};

export default SearchStatus;
