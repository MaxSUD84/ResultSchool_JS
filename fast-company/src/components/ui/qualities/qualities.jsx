import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import {
    getQualitiesByIds,
    getQualitiesLoadingStatus,
    loadQualitiesList
} from "../../../store/qualities";
import Quality from "./quality";

const Qualities = ({ qualities }) => {
    const dispatch = useDispatch();
    // console.log(qualities);
    const isQualLoading = useSelector(getQualitiesLoadingStatus());
    const qualitiesList = useSelector(getQualitiesByIds(qualities));

    useEffect(() => {
        dispatch(loadQualitiesList());
    }, []);

    if (isQualLoading) return <h3>Loading ...</h3>;

    return (
        <>
            {qualitiesList.map((ql) => (
                <Quality
                    key={ql._id}
                    color={ql.color}
                    name={ql.name}
                    _id={ql._id}
                />
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
