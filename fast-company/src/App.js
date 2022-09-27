import React, { useState, useEffect } from "react";
import Users from "./components/users";
import api from "./api/index";

function App() {
    const [users, setUsers] = useState(); // API.users.fetchAll()

    useEffect(() => {
        api.users.default.fetchAll()
            .then((data) => setUsers(data));
    }, []);

    const handleDelete = (id) => {
        setUsers((prevState) => prevState.filter((user) => user._id !== id));
    };

    const handleToggleBookMark = (id) => {
        setUsers((prevState) =>
            prevState.map((user) => ({
                ...user,
                bookmark: user._id === id ? !user.bookmark : user.bookmark
            }))
        );
    };

    return (
        <>
            {
                users && users.length !== 0
                    ? (<Users users={users} onDelete={handleDelete} onToggleBookMark={handleToggleBookMark} />)
                    : ("")
            }
        </>
    );
}

export default App;
