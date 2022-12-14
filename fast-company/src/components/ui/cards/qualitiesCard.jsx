import React from "react";
import { Qualities } from "../../ui/qualities";
import PropTypes from "prop-types";

const QualitiesCard = ({ qualities }) => {
    // console.log("QualitiesCard: ", qualities);
    return (
        <div className="card mb-3">
            <div className="card-body d-flex flex-column justify-content-center text-center">
                <h5 className="card-title">
                    <span>Qualities</span>
                </h5>
                <p className="card-text">
                    <Qualities qualities={qualities} />
                </p>
            </div>
        </div>
    );
};

QualitiesCard.propTypes = {
    // qualities: PropTypes.oneOfType([
    //     PropTypes.arrayOf(PropTypes.object),
    //     PropTypes.object
    // ])
    qualities: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.string),
        PropTypes.string
    ])
};

export default QualitiesCard;
