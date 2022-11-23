import React from "react";
import PropTypes from "prop-types";

const Qualities = (qualities) => {
    const isArray = typeof qualities === "array";
    // console.log("Qualities: ", qualities);
    return (
        <>
            {isArray ? (
                qualities.map((ql) => (
                    <span
                        key={ql._id}
                        className={"badge p-2 m-1 bg-" + ql.color}
                    >
                        {ql.name}
                    </span>
                ))
            ) : (
                <span
                    key={qualities._id}
                    className={"badge p-2 m-1 bg-" + qualities.color}
                >
                    {qualities.name}
                </span>
            )}
        </>
    );
};

Qualities.propTypes = {
    qualities: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.object),
        PropTypes.object
    ])
};

export default Qualities;
