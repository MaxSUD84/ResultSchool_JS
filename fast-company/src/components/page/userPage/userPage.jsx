import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import api from "../../../api";
import Qualities from "../../ui/qualities";
import PropTypes from "prop-types";

const UserPage = ({ id }) => {
    const [user, setUser] = useState(false);

    useEffect(() => {
        api.users.default.getById(id).then((data) => setUser(data));
    }, []);
    // }, [id]);

    const history = useHistory();
    // const handleShowAllUsers = () => {
    //     history.replace("/users");
    // };

    const handleEditUser = () => {
        history.replace(`/users/${id}/edit`);
    };

    return (
        <>
            {user ? (
                <div>
                    <h1>{user.name}</h1>
                    <h2>Профессия: {user.profession.name}</h2>
                    {user.qualities.map((ql) => (
                        <Qualities
                            key={ql._id}
                            _id={ql._id}
                            color={ql.color}
                            name={ql.name}
                        />
                    ))}
                    <p>Посетил встреч: {user.completedMeetings}</p>
                    <h2>Рейтинг: {user.rate}</h2>
                    <button
                        type="button"
                        className="btn btn-dark"
                        onClick={() => handleEditUser()}
                    >
                        Изменить
                    </button>
                </div>
            ) : (
                <h1>Loading user data...</h1>
            )}
        </>
    );
};
UserPage.propTypes = {
    id: PropTypes.string.isRequired
};

export default UserPage;
