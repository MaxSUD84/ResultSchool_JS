import React from "react";
import { useProfessions } from "../../hooks/useProfession";
import PropTypes from "prop-types";

const Profession = ({ id }) => {
    // console.log(id);
    const { isLoading, getProfession } = useProfessions();
    const prof = getProfession(id);
    // console.log(prof.name);
    if (!isLoading) {
        return <p>{prop.name}</p>;
    } else return "loading...";
};

Profession.propTypes = {
    id: PropTypes.string
};

export default Profession;
