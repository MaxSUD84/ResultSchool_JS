import React from "react";
import PropTypes from "prop-types";
import { useQualities } from "../../../hooks/useQualitys";
import Quality from "./quality";

const Qualities = ({ qualities }) => {
    const { getQuality } = useQualities();
    const qualitiesObjArr =
        qualities === "string"
            ? new Array().push(getQuality(qualities))
            : qualities.map((id) => getQuality(id));
    console.log("Qualities: ", qualitiesObjArr);

    return (
        <>
            {qualitiesObjArr.map((ql) => (
                <Quality
                    key={ql._id}
                    color={ql.color}
                    name={ql.name}
                    _id={ql._id}
                />
                // <span key={ql._id} className={"badge p-2 m-1 bg-" + ql.color}>
                //     {ql.name}
                // </span>
            ))}
        </>
    );
};

Qualities.propTypes = {
    qualities: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.string),
        PropTypes.string
    ])
};

export default Qualities;
