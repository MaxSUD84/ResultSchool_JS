import React from "react";
// import { useProfessions } from "../../hooks/useProfessions";
import {
    getProfessionsById,
    getProfessionsLoadingStatus
} from "../../store/professions";

import { useSelector } from "react-redux";
import PropTypes from "prop-types";

const Profession = ({ id }) => {
    // console.log(id);
    // const { isLoading, getProfession } = useProfessions();
    // const prof = getProfession(id);

    const prof = useSelector(getProfessionsById(id));
    const isLoading = useSelector(getProfessionsLoadingStatus());

    // console.log(prof.name);
    if (!isLoading) {
        return <p>{prof.name}</p>;
    } else return "loading...";
};

Profession.propTypes = {
    id: PropTypes.string
};

export default Profession;
