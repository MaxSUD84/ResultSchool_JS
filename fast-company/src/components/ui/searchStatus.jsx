import React from "react";
import PropTypes from "prop-types";

// eslint-disable-next-line react/prop-types
const SearchStatus = ({ length }) => {
    //   console.log("SearchStatus");

    const renderPhrase = (number) => {
        return number && [2, 3, 4].includes(number)
            ? number + " человека тусанут с тобой сегодня"
            : number
                ? number + " человек тусанет с тобой сегодня"
                : "Никто с тобой не тусанет сегодня";
    };

    return (
        <span className={"badge p-2 m-2 bg-" + (length ? "primary" : "danger")}>
            {renderPhrase(length)}
        </span>
    );
};
SearchStatus.porpTypes = {
    length: PropTypes.number.isRequired
};

export default SearchStatus;
