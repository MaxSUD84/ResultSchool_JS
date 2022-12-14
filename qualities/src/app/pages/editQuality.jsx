import React from "react";
import { useParams, useHistory } from "react-router";
import QualityForm from "../components/ui/qualityForm";
import { useQualities } from "../hooks/useQualities";

const EditQualityPage = () => {
    const id = useParams().id;
    const history = useHistory();
    const { getQuality, updateQuality } = useQualities();
    const quality = getQuality(id);
    // console.log(quality);

    const handleSubmit = async (data) => {
        updateQuality(data).then((data) => {
            if (data) history.push("/");
        });
    };

    return (
        <>
            <h1>Edit Quality Page</h1>
            <QualityForm data={quality} onSubmit={handleSubmit} />
        </>
    );
};

export default EditQualityPage;
