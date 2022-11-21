import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import EditForm from "../components/ui/editForm";
import httpService from "../services/http.service";
// import config from "../config.json";

const EditQualityPage = () => {
    const [quality, setQuality] = useState(null);
    const id = useParams().id;
    // const qualityEndPoint = config.apiEndpoint + `quality/${id}`; // endPoint перенесен в baseURL
    const qualityEndPoint = `quality/${id}`;

    useEffect(async () => {
        const { data } = await httpService.get(qualityEndPoint);
        setQuality(data.content);
    }, []);

    const handleSubmint = async (data) => {
        try {
            await httpService.put(null, data).then((res) => console.log(res.data.content));
        } catch (error) {
            {
                console.log("Expected error");
            }
        }
    };

    return (
        <>
            <h1>Edit Quality Page</h1>
            {quality !== null ? <EditForm data={quality} onSubmit={handleSubmint} /> : "Loading data ..."}
        </>
    );
};

export default EditQualityPage;
