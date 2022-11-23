import React, { useContext, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import qualityService from "../services/quality.service";

const QualitiesContex = React.createContext();
export const useQualities = () => {
    return useContext(QualitiesContex);
};

export const QualitiesProvider = ({ children }) => {
    const [qualities, setQualities] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const prevState = useRef();
    useEffect(() => {
        const getQualities = async () => {
            try {
                const { content } = await qualityService.fetchAll();
                setQualities(content);
                setIsLoading(false);
            } catch (error) {
                errorCatcher(error);
            }
        };
        getQualities();
    }, []);

    const getQuality = (id) => {
        // console.log(qualities);
        return qualities.find((q) => q._id === id);
    };

    const updateQuality = async ({ _id: id, ...data }) => {
        try {
            const { content } = await qualityService.update(id, data);
            setQualities((prevState) =>
                prevState.map((item) => {
                    if (item._id === content._id) {
                        return content;
                    }
                    return item;
                })
            );
            return content;
        } catch (error) {
            errorCatcher(error);
        }
    };

    const addQuality = async (data) => {
        try {
            const { content } = await qualityService.create(data);
            setQualities((prevState) => [...prevState, content]);
            return content;
        } catch (error) {
            errorCatcher(error);
        }
    };

    const deleteQuality = async (id) => {
        // оптимистичное обновление данных
        prevState.current = qualities;
        setQualities((prevState) => prevState.filter((item) => item._id !== id));
        try {
            await qualityService.delete(id);
        } catch (error) {
            errorCatcher(error);
            // toast("Object not deleted!");
            setQualities(prevState.current);
        }

        // писиместическое обновление данных
        // try {
        //     const { content } = await qualityService.delete(id);
        //     setQualities((prevState) => prevState.filter((item) => item._id !== content._id));
        //     return content;
        // } catch (error) {
        //     errorCatcher(error)
        // }
    };

    function errorCatcher(error) {
        const { message } = error.response.data;
        setError(message);
    }

    useEffect(() => {
        if (error !== null) {
            toast.error(error);
            setError(null);
        }
    }, [error]);

    return (
        <QualitiesContex.Provider value={{ qualities, getQuality, updateQuality, addQuality, deleteQuality }}>
            {!isLoading ? children : <h1>Qualities Loading ...</h1>}
        </QualitiesContex.Provider>
    );
};
