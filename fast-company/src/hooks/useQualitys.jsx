import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import qualityService from "../services/quality.service";
import { toast } from "react-toastify";

const QualityContext = React.createContext();

export const useQualities = () => useContext(QualityContext);

export const QualityProvider = ({ children }) => {
    const [qualities, setQualities] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getQualitiesList();
    }, []);

    useEffect(() => {
        if (error !== null) {
            toast.error(error);
            setError(null);
        }
    }, [error]);

    async function getQualitiesList() {
        try {
            const { content } = await qualityService.fetchAll();
            setQualities(content);
            setLoading(false);
        } catch (error) {
            errorCather(error);
        }
    }

    function getQuality(id) {
        return qualities.find((p) => p._id === id);
    }

    function errorCather(error) {
        const { message } = error.response.data;
        setError(message);
    }

    return (
        <QualityContext.Provider value={{ isLoading, qualities, getQuality }}>
            {!isLoading ? children : "Wait Qualities Loading ..."}
        </QualityContext.Provider>
    );
};

QualityProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};
