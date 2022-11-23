import React from "react";
import { useHistory } from "react-router-dom";
import QualitiesTable from "../components/ui/qualitiesTable";
import { useQualities } from "../hooks/useQualities";

const QualitiesListPage = () => {
    // const [qualities, setQualities] = useState([]);
    const history = useHistory();

    const { qualities, deleteQuality } = useQualities();

    const handleEdit = (param) => {
        history.push(`/edit/${param}`);
    };
    const handleDelete = (id) => {
        deleteQuality(id);
        // console.log(id);
    };
    return (
        <>
            <h1>Qualitites List Page</h1>
            <QualitiesTable onDelete={handleDelete} onEdit={handleEdit} data={qualities} />
        </>
    );
};

export default QualitiesListPage;
